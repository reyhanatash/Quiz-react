import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Book from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function EnhancedTable(props) {
  // Adding Rows
  let rows = [];
  if (props.newdata) {
    props.newdata.forEach(data => {
      rows.push({
        id: data.fldPkTestMaster,
        rowNumber: data.fldRowNumber,
        name: data.fldTestTitle,
        chapterName: data.fldTestBookChapterName,
        subBookName: data.fldSubBookChapterName,
        topicName: data.fldTopicName,
      });
    });
  }
  // Toltip Button
  const [openToltip, setOpenToltip] = React.useState(false);
  const handleTooltipClose = () => {
    setOpenToltip(false);
  };
  const handleTooltipOpen = () => {
    setOpenToltip(true);
  };

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }
  // Head Rows
  const headCells = [
    { id: 'id', numeric: true, label: 'عملیات' },
    { id: 'topicName', numeric: false, label: 'مبحث' },
    { id: 'subBookName', numeric: false, label: 'زیرفصل' },
    // { id: 'chapterName', numeric: false, label: 'فصل' },
    { id: 'name', numeric: false, label: 'عنوان' },
    { id: 'rowNumber', numeric: false, label: 'شماره' },
  ];

  function EnhancedTableHead(props) {
    const {
      classes,
      // onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="none">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            /> */}
          </TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    actions2: {
      color: 'blue',
    },
    actions3: {
      color: 'green',
    },
    title: {
      flex: '0 0 auto',
    },
  }));

  const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <h5 id="tableTitle" className="h5 pr-3">
              لیست تست ها
              {rows.length !== 0 ? ' - از فصل ' + rows[0].chapterName : ''}
            </h5>
          )}
        </div>
        <div className={classes.spacer} />
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('rowNumber');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = event => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map(n => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1),
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const handleChangeDense = event => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table + ' table-student table-admin-test'}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.name)}
                      role="radio"
                      name="td"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      <TableCell padding="none" align="center">
                        {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                      </TableCell>
                      <TableCell align="center" className="py-1 text-center">
                        <Tooltip
                          className="table-icon-info"
                          title={
                            <span style={{ fontSize: '12px' }}>نمایش</span>
                          }
                        >
                          <IconButton
                            aria-label="Go to Test"
                            onClick={() =>
                              // props.openQuizModal(row.name, row.id, 2)
                              props.goToViewTest(row.id, row.rowNumber)
                            }
                          >
                            <ListAltIcon className={classes.actions3} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{row.topicName}</TableCell>
                      <TableCell align="center">{row.subBookName}</TableCell>
                      {/* <TableCell align="center">{row.chapterName}</TableCell> */}
                      <TableCell
                        align="right"
                        style={{ textAlign: 'right !important' }}
                        className="pr-0"
                      >
                        {row.name && row.name.length > 160
                          ? row.name.slice(0, 160) + '...'
                          : row.name}
                      </TableCell>
                      <TableCell
                        className="pl-0 font-weight-bold"
                        align="center"
                        // style={{
                        //   textAlign: 'center !important',
                        //   width: '35px',
                        // }}
                      >
                        ({row.rowNumber}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 8, 10, 25]}
          component="div"
          labelRowsPerPage={': ردیف در هر صفحه'}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to === -1 ? count : to} از ${count}`
          }
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'صفحه  قبل',
          }}
          nextIconButtonProps={{
            'aria-label': 'صفحه بعد',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
