import React, { useState, useEffect } from 'react';
import { ListGroup, ButtonGroup, Button, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';
import FilterLoadQuiz from '../../components/CreateQuizPage/FilterLoadQuiz';

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
function LoadQuiz(props) {
  const classes = useStyles();

  let loadedQuiz = [];
  if (props.Quiz) {
    props.Quiz.forEach(data => {
      loadedQuiz.push({
        id: data.fldPkQuizMaster,
        bookId: data.fldFkTestBook,
        name: data.fldName,
        time: data.fldDuration,
        testNum: data.testCount,
        testArry: data.testArry,
        minRealTime: data.minPercentageTrueAnswerReal,
        maxRealTime: data.maxPercentageTrueAnswerReal,
        averageRealTime: data.avgPercentageTrueAnswerReal,
        countPeople: data.numberOfStudentForPerQuiz,
        desc: data.fldQuizDiscription,
        testBook: data.fldTestBookName,
      });
    });
  }

  // Modal Confirm Delete
  const [open, setOpen] = React.useState(false);
  const [modalQuiz, setModalQuiz] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = data => {
    setModalQuiz(data);
    setOpen(true);
    console.log(modalQuiz);
  };
  // Load More
  const loader = <CircularProgress color="primary" />;
  const items = [];
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [numLoadMore, setnumLoadMore] = useState(3);
  const loadItems = page => {
    if (props.Quiz) {
      if (page >= props.Quiz.length) {
        setHasMoreItems(false);
      } else {
        setnumLoadMore(numLoadMore + 1);
      }
    }
  };
  useEffect(() => {
    setHasMoreItems(true);
  }, [props.Quiz]);
  return (
    <>
      <Col className="bg-white py-2 quiz-box-shadow" style={{ minHeight: 400 }}>
        <div className="d-flex flex-column">
          <h5 className="py-2 mb-4">آزمون های ساخته شده</h5>
          <FilterLoadQuiz
            Books={props.Books}
            filterByTestBook={props.filterByTestBook}
          />
          {/* <Tooltip title={<span>ساخت آزمون</span>}>
          <Button
            outline
            color="white"
            onClick={''}
            className="my-2 add-book-btn btn-floating bg-white"
          >
            <QuizIcon />
          </Button>
        </Tooltip> */}
        </div>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={hasMoreItems}
          loader={loader}
          threshold={50}
          key={props.Quiz}
        >
          <ListGroup
            className="flex-row-reverse align-items-start flex-wrap justify-content-start"
            key={props.Quiz}
          >
            {items}
            {loadedQuiz.splice(0, numLoadMore).forEach(data => {
              items.push(
                <ExpansionPanel
                  defaultExpanded={true}
                  className="col-lg-3 col-md-5 col-sm-12 direction-right  mb-5 py-2 mt-0 px-1 offset-lg-1 offset-md-1 offset-sm-0"
                  key={data.id}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <span className={classes.heading}>{data.name}</span>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="py-3 px-3 flex-column">
                    <span className="mb-2" style={{ fontSize: '0.94rem' }}>
                      کتاب : {data.testBook}
                    </span>
                    <span className="mb-2" style={{ fontSize: '0.94rem' }}>
                      زمان آزمون : {data.time}
                    </span>
                    <span className="mb-2" style={{ fontSize: '0.94rem' }}>
                      تعداد تست ها : {data.testNum}
                    </span>
                    <tr className="mb-2" style={{ fontSize: '0.94rem' }}>
                      <td>حداقل درصد : </td>
                      <td style={{ direction: 'ltr' }}>
                        {data.minRealTime}
                        {data.minRealTime ? '%' : ''}
                      </td>
                    </tr>
                    <tr className="mb-2" style={{ fontSize: '0.94rem' }}>
                      <td> حداکثر درصد : </td>
                      <td style={{ direction: 'ltr' }}>
                        {data.maxRealTime}
                        {data.maxRealTime ? '%' : ''}
                      </td>
                    </tr>
                    <tr className="mb-2" style={{ fontSize: '0.94rem' }}>
                      <td> میانگین درصد : </td>
                      <td style={{ direction: 'ltr' }}>
                        {data.averageRealTime}
                        {data.averageRealTime ? '%' : ''}
                      </td>
                    </tr>
                    <span className="mb-2" style={{ fontSize: '0.94rem' }}>
                      تعداد دانش آموزان : {data.countPeople}
                    </span>
                    <span
                      className="mb-2"
                      style={{
                        fontSize: '0.94rem',
                        height: '75px',
                        overflowY: 'auto',
                      }}
                    >
                      توضیحات : {data.desc}
                    </span>
                  </ExpansionPanelDetails>
                  <ButtonGroup className="direction-left px-3">
                    <Button
                      className=" rounded"
                      style={{ fontSize: '0.8rem' }}
                      color="secondary"
                      outline
                      onClick={() => {
                        handleClickOpen(data);
                      }}
                    >
                      حذف
                    </Button>
                    <Button
                      className="ml-3 rounded"
                      style={{ fontSize: '0.8rem' }}
                      color="primary"
                      onClick={() => props.selectQuiz(data)}
                    >
                      ویرایش
                    </Button>
                  </ButtonGroup>
                </ExpansionPanel>,
              );
            })}
          </ListGroup>
        </InfiniteScroll>
      </Col>
      {/* Modal Confirm Delete */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`حذف ${modalQuiz.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              آیا از حذف آزمون مطمئن هستید ؟
            </DialogContentText>
          </DialogContent>
          <DialogActions
            className="justify-content-start"
            style={{ padding: '10px 22px' }}
          >
            <Button
              autoFocus
              onClick={handleClose}
              color="outline-primary"
              className="ml-3 rounded col-2"
            >
              لغو
            </Button>
            <Button
              onClick={() => {
                props.deleteQuiz(modalQuiz.id);
                handleClose();
              }}
              color="outline-secondary"
              autoFocus
              className="rounded col-2"
            >
              حذف
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default LoadQuiz;
