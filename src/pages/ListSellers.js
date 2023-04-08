import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Avatar,
  Card,
  Checkbox,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
// components
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
// sections
import { ListSellerHead, ListSellerToolbar } from '../sections/@dashboard/listsellers';
// mock
import APIService from '../services/api';
import RandomColorSelector from "../services/randomColorSelector";

const ActionModal = lazy(() => import('../sections/@dashboard/listsellers/ActionModal'));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'companyname', label: 'Company', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  { id: 'isverfied', label: 'isVerfied', align: 'left' },
  { id: 'action', label: 'Action', align: 'center' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function ListSellers() {

  const [USERLIST, setUSERLIST] = useState([]);
  const [actionModal, setActionModal] = useState({ view: false, type: "" });

  useEffect(() => {
    APIService.ListSellers().then((res) => {
      console.log(res?.data?.data);
      setUSERLIST(res?.data?.data);
    });
    setUSERLIST();
  }, []);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST?.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

  const avatarColor = RandomColorSelector();

  const handleEdit = (id) => {
    setActionModal({ type: "edit", view: true });
  }

  const handleDelete = (id) => {
    setActionModal({ type: "delete", view: true });
  }

  return (
    <>
      <Helmet>
        <title> List Sellers | E Kart </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            List Sellers
          </Typography>
        </Stack>

        <Card>
          <ListSellerToolbar  filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListSellerHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onRequestSort={handleRequestSort}
                />
                <TableBody >
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { userId, address, name, companyname, status } = row;

                    return (
                      <TableRow hover key={userId} tabIndex={-1} role="checkbox">

                        <TableCell component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ backgroundColor: avatarColor, color: "black" }}>{name?.split("")[0]}</Avatar>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{companyname}</TableCell>

                        <TableCell align="left">{address}</TableCell>

                        <TableCell align="left">
                          <Label color={status === "success" ? 'success' :  'error'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align='center'>
                          <IconButton aria-label="edit" onClick={() => handleEdit(userId)}>
                            <EditRoundedIcon />
                          </IconButton>

                          <IconButton aria-label="delete" onClick={() => handleDelete(userId)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST?.length ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ActionModal  state={actionModal} setState={setActionModal}/>
    </>
  );
}
