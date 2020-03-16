import React from 'react';
import AuthorCard from '../Card/AuthorCard';
import { Row, ListGroup, ListGroupItem, PopoverBody, Button } from 'reactstrap';
import { MdAdd, MdDelete, MdEdit, MdFilterNone, MdLens } from 'react-icons/md';
import Check from '@material-ui/icons/CheckCircleOutline';
import Error from '@material-ui/icons/ErrorOutline';
import SearchInputTest from './SearchInputTest';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import parse from 'html-react-parser';
import { animations } from 'react-animation';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Select from 'react-select';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';

export default function AddTestSide(props) {
  // Default Value
  const [defualtTestBookChapter, setDefualtTestBookChapter] = React.useState(
    null,
  );

  React.useEffect(() => {
    const find = testBookChapterOption.find(op => op.id === props.filteredTest);
    if (props.filteredTest !== -1) {
      setDefualtTestBookChapter(find);
    }
  }, [props.filteredTest]);

  // Modal Confirm Delete
  const [open, setOpen] = React.useState(false);
  const [modalTest, setModalTest] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClickOpen = num => {
    setOpen(true);
    setModalTest(num);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let Tests = [];
  const [search, searchUpdate] = React.useState('');
  if (props.loadTestData) {
    // const unique = [...new Set(props.loadTestData.map(item => item.pkTestMaster))];
    // console.log(unique);
    let poll = [];
    let uniqueTest = props.loadTestData.filter(x => {
      if (poll.includes(x.pkTestMaster)) return false;
      else {
        poll.push(x.pkTestMaster);
        return true;
      }
    });
    uniqueTest.forEach(data => {
      if (data.name === null || data.name === '') {
        Tests.unshift({
          name: `تست شماره ${data.rowNumber} فاقد عنوان تست میباشد`,
          id: data.pkTestMaster,
          rowNumber: data.rowNumber,
          status: data.fldStatus,
        });
      } else {
        Tests.unshift({
          name: data.name,
          Html: data.questionName,
          id: data.pkTestMaster,
          rowNumber: data.rowNumber,
          status: data.fldStatus,
        });
      }
    });
  }
  const searched = val => {
    searchUpdate(val);
  };

  // const [limit, limitUpldate] = React.useState(5);
  // React.useEffect(() => {
  //   limitUpldate(5);
  // }, [props.loadTestData]);

  // let save_btn = Tests.length <= limit ? 'disabled_btn_save' : '';

  // if (Tests.length === limit) {
  //   // this.refs.btn.setAttribute("disabled", "disabled");
  //   console.log(`we have ${Tests.length} tests`)
  // }

  // Tests Options
  let testBookChapterOption = [];
  if (props.testBookChapterData) {
    props.testBookChapterData.forEach(data => {
      testBookChapterOption.push({
        id: data.pkChapterTestBook,
        label: data.chapterTestBookName,
        value: data.chapterTestBookName,
      });
    });
  }
  // Books Options
  let bookChapterOption = [];
  if (props.bookChapterData) {
    props.bookChapterData.forEach(data => {
      bookChapterOption.push({
        id: data.fldPkBookChapter,
        label: data.fldBookChapterName,
        value: data.fldBookChapterName,
      });
    });
  }
  // Filter Test Status
  const [value, setValue] = React.useState({
    checkedComplete: false,
    checkedIncomplete: false,
  });
  const [valueStatus, setValueStatus] = React.useState(null);
  const handleChange = name => event => {
    setValue({ ...value, [name]: event.target.checked });
  };
  React.useEffect(() => {
    if (value.checkedComplete === true && value.checkedIncomplete === false) {
      props.filterTestStatus(1);
      setValueStatus(1);
    } else if (
      value.checkedIncomplete === true &&
      value.checkedComplete === false
    ) {
      props.filterTestStatus(0);
      setValueStatus(0);
    } else if (
      value.checkedIncomplete === false &&
      value.checkedComplete === false
    ) {
      props.filterTestStatus(null);
      setValueStatus(null);
    } else if (
      value.checkedIncomplete === true &&
      value.checkedComplete === true
    ) {
      props.filterTestStatus(null);
      setValueStatus(null);
    } else {
      props.filterTestStatus(null);
      setValueStatus(null);
    }
  }, [value]);

  // const onDragEnd = result => {
  //   const { destination, source, reason } = result;

  //   // Not a thing to do...
  //   if (!destination || reason === 'CANCEL') {
  //     this.setState({
  //       draggingRowId: null,
  //     });
  //     return;
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const starredProjects = Object.assign([], this.state.starredProjects);
  //   const project = this.state.starredProjects[source.index];
  //   starredProjects.splice(source.index, 1);
  //   starredProjects.splice(destination.index, 0, project);
  //   this.setState({
  //     starredProjects,
  //   });
  // };

  const onDragEnd = result => {
    if (result.source !== null && result.destination !== null) {
      const source = Tests[result.source.index];
      const destination = Tests[result.destination.index];
      if (source === destination || !result.destination) {
        return;
      } else {
        props.dragUpdate(source, destination);
      }
    }
  };
  ////////////////////////////////////// Expand Menu ///////////////////////////////////////////////
  const [expandMenu, updateExpandMenu] = React.useState(true);
  const expandMenuHandler = e => {
    e.stopPropagation();
    updateExpandMenu(!expandMenu);
  };

  return (
    <>
      <PopoverBody
        className="p-0 border-light tests-side"
        style={{ height: '55%' }}
      >
        <AuthorCard title="تست ها" className="border-light side-test-header">
          <ListGroup flush className="flex-column-reverse bg-white">
            {/* <ListGroupItem
            tag="button"
            action
            className="border-light order-12 direction-right"
            onClick={() => props.resetTest()}
          >
            <MdAdd className="add-test-btn" /> افزودن تست
          </ListGroupItem> */}
            <ListGroupItem className="order-10 px-0 d-flex flex-column">
              <SearchInputTest searchTest={Tests} searched={searched} />
              <div>
                <ExpansionPanel expanded={expandMenu}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className="direction-right  mt-3"
                    onClick={expandMenuHandler}
                  >
                    <span style={{ fontSize: '0.8rem' }} className="text-muted">
                      جستجو پیشرفته{' '}
                    </span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails
                    style={{ padding: '15px 5px' }}
                    className="d-flex flex-column"
                  >
                    {/* Test Book Chapter */}
                    <div className="col-12 px-0" key={defualtTestBookChapter}>
                      <Select
                        closeMenuOnSelect={true}
                        isClearable={() => defualtTestBookChapter(null)}
                        noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                        key={testBookChapterOption.map(item => item.label)}
                        name="answer-select"
                        id="answer-select"
                        className={
                          'direction-right col-12 text-right text-dark'
                        }
                        placeholder=" بر‌اساس فصل کتاب تست"
                        options={testBookChapterOption}
                        // defaultValue={defualtTestBookChapter}
                        value={defualtTestBookChapter}
                        onChange={val => {
                          if (val !== null) {
                            props.filterTestBook({
                              target: { value: val.id, status: valueStatus },
                            });
                          } else {
                            setDefualtTestBookChapter(null);
                            props.filterTestBook({
                              target: { value: '', status: valueStatus },
                            });
                          }
                        }}
                      />
                    </div>
                    {/* Book Chapter */}
                    <div className="col-md-12 mt-2 px-0">
                      <Select
                        closeMenuOnSelect={true}
                        isClearable
                        key={bookChapterOption.map(item => item.label)}
                        name="answer-select"
                        id="answer-select"
                        noOptionsMessage={() => 'گزینه ای وجود ندارد'}
                        className={
                          'direction-right w-100 col-md-12 mt-2 text-right'
                        }
                        placeholder="بر‌اساس فصل کتاب درسی"
                        options={bookChapterOption}
                        onChange={val => {
                          if (val !== null) {
                            props.filterBook({
                              target: { value: val.id, status: valueStatus },
                            });
                          } else {
                            props.filterBook({
                              target: { value: '', status: valueStatus },
                            });
                          }
                        }}
                      />
                    </div>
                    {/* Status */}
                    <div>
                      <FormControl component="fieldset" className="my-4 w-100">
                        <span
                          style={{ fontSize: '0.9rem' }}
                          className="text-muted mb-2"
                        >
                          بر‌اساس وضعیت تست‌ها
                        </span>
                        <RadioGroup
                          aria-label="complete"
                          name="complete1"
                          value={value}
                          onChange={handleChange}
                          className="align-items-end justify-content-end flex-row"
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={value.checkedComplete}
                                onChange={handleChange('checkedComplete')}
                                value="checkedComplete"
                                color="primary"
                              />
                            }
                            label="تست‌های کامل"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={value.checkedIncomplete}
                                onChange={handleChange('checkedIncomplete')}
                                value="checkedIncomplete"
                                color="primary"
                              />
                            }
                            label="تست‌های نیمه‌تمام"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </ListGroupItem>
            <ListGroupItem
              className="d-flex flex-column"
              style={{ maxHeight: '75vh', overflowY: 'scroll', padding: '0' }}
              key={props.editMode ? props.loadTestData.questionName : Tests.id}
            >
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      // style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {Tests.map((item, pkTestDetail) => {
                        let statusClass;
                        let statusTitle;
                        let satusButton;
                        if (item.status === 1) {
                          statusClass = 'status-c';
                          satusButton = ' status-button-c';
                          statusTitle = 'تست کامل است';
                        } else if (item.status === 0) {
                          statusClass = 'status-u';
                          satusButton = ' status-button-u';
                          statusTitle = 'تست نیمه تمام است';
                        }
                        let display = 'none';
                        if (item.name.includes(search)) {
                          display = 'flex';
                        }
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.name}
                            index={pkTestDetail}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <ListGroupItem
                                  action
                                  className="flex-column border-ligh direction-right justify-content-start align-items-start test_wrapper position-relative"
                                  style={{
                                    display: display,
                                    animation: animations.fadeIn,
                                  }}
                                  key={pkTestDetail}
                                >
                                  <DragHandleIcon
                                    style={{
                                      fontSize: 18,
                                      position: ' absolute',
                                      top: '50%',
                                      left: '87%',
                                      opacity: '0.5',
                                    }}
                                  />
                                  <Tooltip
                                    TransitionProps={{ timeout: 300 }}
                                    placement="right"
                                    disableFocusListener
                                    title={<span>{statusTitle}</span>}
                                  >
                                    <IconButton
                                      aria-label="lens"
                                      className="position-absolute status-button"
                                      style={{ backgroundColor: 'transparent' }}
                                      key={item.status}
                                    >
                                      {item.status === 1 ? (
                                        <Check
                                          className={`position-absolute status-icon ${statusClass}`}
                                        />
                                      ) : (
                                        <Error
                                          className={`position-absolute status-icon ${statusClass}`}
                                        />
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                  <span className="test_title d-flex align-items-baseline">
                                    <strong>{item.rowNumber}</strong> -{' '}
                                    {item.name.length >= 50
                                      ? item.name.substr(0, 50) + '...'
                                      : item.name}
                                  </span>
                                  <Row className="md-parent flex-row align-self-center justify-content-center">
                                    <MdDelete
                                      className="delete-btn mt-2"
                                      onClick={() => handleClickOpen(item)}
                                    />
                                    <MdEdit
                                      className="edit-btn ml-2 mr-3 mt-2"
                                      onClick={() =>
                                        props.selectedTest(item.id)
                                      }
                                    />
                                  </Row>
                                </ListGroupItem>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </ListGroupItem>
            <ListGroupItem></ListGroupItem>
          </ListGroup>
          {/* <Button
            style={{ width: '100%', whiteSpace: 'nowrap', textAlign: 'center' }}
            className={save_btn}
            onClick={() => limitUpldate(limit + 3)}
          >
            بیشتر
          </Button> */}
        </AuthorCard>
      </PopoverBody>
      {/* Modal Confirm Delete */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`حذف تست شماره ${modalTest.rowNumber}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>آیا از حذف تست مطمئن هستید ؟</DialogContentText>
          </DialogContent>
          <DialogActions
            className="justify-content-start"
            style={{ padding: '10px 22px' }}
          >
            <Button
              autoFocus
              onClick={handleClose}
              color="outline-primary"
              className="ml-3 rounded"
            >
              لغو
            </Button>
            <Button
              onClick={() => {
                props.deleteTest(modalTest.id);
                handleClose();
              }}
              color="outline-secondary"
              autoFocus
              className="rounded"
            >
              حذف
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
