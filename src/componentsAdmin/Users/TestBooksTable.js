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
import { FormGroup, Label, Input, Button } from 'reactstrap';
import Popover from '@material-ui/core/Popover';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';

export default function EnhancedTable(props) {
  // Adding Rows
  let rows = [];
  if (props.newdata) {
    props.newdata.forEach(data => {
      rows.push({
        id: data.fldPkTestBook,
        name: data.fldTestBookName,
        author: data.fldAuthor,
        isActive: data.fldIsActive,
        desc: data.fldTestBookDiscription,
        price: data.fldPrice,
        approve: data.fldApprove,
        rejectComment: data.fldComment,
        rejectType: data.fldFkRejectType,
        isFinish: data.fldIsFinish,
        date: data.fldDateShamsi,
      });
    });
  }
  // Toltip Button
  const [data, setdata] = React.useState({});
  const [comment, setComment] = React.useState(null);
  const commentHandler = e => {
    setComment(e.currentTarget.value);
  };
  const [rejectType, setrejectType] = React.useState(0);
  const typeHandler = id => {
    setrejectType(id);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event, data) => {
    setdata(data);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  const handleClose = () => {
    setAnchorEl(null);
    setdata({});
    setComment(null);
    setrejectType(0);
    setValueTabs(null);
  };

  const [valueTabs, setValueTabs] = React.useState(null);
  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValueTabs(newValue);
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
    {
      id: 'date',
      numeric: true,
      label: 'تاریخ آخرین تغییرات',
    },
    {
      id: 'approve',
      numeric: true,
      label: 'وضعیت',
    },
    { id: 'price', numeric: false, label: 'قیمت ' },
    { id: 'desc', numeric: false, label: 'توضیحات ' },
    // { id: 'isActive', numeric: false, label: 'فعال / غیر فعال' },
    { id: 'author', numeric: false, label: 'نویسنده' },
    { id: 'name', numeric: false, label: 'نام ' },
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
              لیست تمامی کتاب ها
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
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
            className={classes.table + ' table-student'}
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
                      <TableCell padding="none">
                        {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                      </TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.approve === true ? (
                          <span className="text-success">تایید شده</span>
                        ) : row.approve === false && row.isFinish === 1 ? (
                          <span className="">تعیین نشده</span>
                        ) : row.approve === false && row.isFinish === 2 ? (
                          <span className="text-danger">تایید نشده</span>
                        ) : (
                          'نامشخص'
                        )}
                        <Tooltip
                          className="table-icon-edit"
                          title={
                            <span style={{ fontSize: '12px' }}>
                              تغییر وضعیت
                            </span>
                          }
                        >
                          <IconButton
                            aria-label="delete"
                            onClick={event => handleClick(event, row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Popover
                          key={row.id}
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <h5
                            style={{
                              fontSize: '18px',
                              color: 'black',
                              margin: '10px 0',
                            }}
                          >
                            {data.name}
                          </h5>
                          <Paper square style={{ width: '100%' }}>
                            <Tabs
                              value={
                                valueTabs === null && data.approve === false
                                  ? 1
                                  : valueTabs === null && data.approve === true
                                  ? 0
                                  : valueTabs
                              }
                              // indicatorColor="primary"
                              textColor="primary"
                              onChange={handleChange}
                              aria-label="tabs"
                              variant="fullWidth"
                              TabIndicatorProps={{
                                style: {
                                  backgroundColor: 'transparent',
                                },
                              }}
                            >
                              <Tab icon={<DoneIcon />} label="تایید" />
                              <Tab icon={<ClearIcon />} label="عدم تایید" />
                            </Tabs>
                          </Paper>
                          <FormGroup className="d-flex flex-column col-12 p-0 flex-wrap pb-3 pt-4">
                            <Label for="hashtag" className="ml-auto">
                              توضیحات عدم تایید
                            </Label>
                            <Input
                              className="direction-right col-12 form-control desc-quiz"
                              type="textarea"
                              name="text"
                              id="exampleText"
                              placeholder="عدم..."
                              disabled={
                                valueTabs === null && data.approve === false
                                  ? false
                                  : valueTabs === null && data.approve === true
                                  ? true
                                  : valueTabs === 0
                                  ? true
                                  : false
                              }
                              onChange={commentHandler}
                              defaultValue={
                                data.rejectComment &&
                                data.rejectComment !== null
                                  ? data.rejectComment
                                  : null
                              }
                            />
                            <Label
                              for="hashtag"
                              className="ml-auto mt-3"
                              style={{ marginBottom: '-12px' }}
                            >
                              گزینه های عدم تایید
                            </Label>
                            <FormGroup check inline className="mr-0 mt-2">
                              {props.loadRejectTypes
                                ? props.loadRejectTypes.map(type => {
                                    return (
                                      <Label
                                        key={type.fldPkRejectType}
                                        check
                                        className="mt-0 text-dark"
                                      >
                                        <Input
                                          onChange={() =>
                                            typeHandler(type.fldPkRejectType)
                                          }
                                          type="radio"
                                          name="type"
                                          defaultChecked={
                                            data.rejectType &&
                                            data.rejectType !== null
                                              ? data.rejectType ===
                                                type.fldPkRejectType
                                              : null
                                          }
                                          disabled={
                                            valueTabs === null &&
                                            data.approve === false
                                              ? false
                                              : valueTabs === null &&
                                                data.approve === true
                                              ? true
                                              : valueTabs === 0
                                              ? true
                                              : false
                                          }
                                        />{' '}
                                        {type.fldNameRejectType}
                                      </Label>
                                    );
                                  })
                                : null}
                            </FormGroup>
                            <Button
                              onClick={() => {
                                props.approveOrRejectTestBook(
                                  data.id,
                                  valueTabs,
                                  comment,
                                  rejectType,
                                );
                                handleClose();
                              }}
                              color="outline-primary"
                              autoFocus
                              className="rounded col-md-3 col-sm-12"
                            >
                              ذخیره
                            </Button>
                          </FormGroup>
                        </Popover>
                      </TableCell>
                      <TableCell align="right" className="direction-right">
                        {' '}
                        {row.price} ریال
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.desc && row.desc.length > 97
                          ? '...' + row.desc.slice(0, 97)
                          : row.desc}
                      </TableCell>
                      {/* <TableCell align="right">
                        {row.isActive
                          ? 'فعال'
                          : row.isActive === false
                          ? 'غیر فعال'
                          : 'نامشخص'}
                      </TableCell> */}
                      <TableCell align="right">{row.author}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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
