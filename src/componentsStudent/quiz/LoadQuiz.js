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
        id: data.fldFkMasterQuiz,
        bookId: data.fldFkTestBook,
        name: data.fldName,
        time: data.fldDuration,
        testNum: data.testCount,
        testArry: data.testArry,
        minRealTime: data.minPercentageTrueAnswerReal,
        maxRealTime: data.maxPercentageTrueAnswerReal,
        averageRealTime: data.avgPercentageTrueAnswerReal,
        desc: data.fldQuizDiscription,
      });
    });
  }

  // // Modal Confirm Delete
  // const [open, setOpen] = React.useState(false);
  // const [modalQuiz, setModalQuiz] = React.useState(0);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleClickOpen = data => {
  //   setModalQuiz(data);
  //   setOpen(true);
  //   console.log(modalQuiz);
  // };
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

  // Start Quiz
  const submitQuiz = (data, random) => {
    const getBookModal = {
      MasterId: 0,
      QuizId: random === false ? data.id : 0,
      Action: 6,
      name: random === false ? data.name : props.Quiz[0].fldName,
      duration: random === false ? data.time : props.Quiz[0].fldDuration,
      isRandom: random === false ? null : 1,
      TestBookId: random === false ? null : props.TestBookId,
    };
    props.goToStartTest(getBookModal);
  };

  return (
    <>
      <Col className="bg-white py-2 quiz-box-shadow" style={{ minHeight: 400 }}>
        <div className="d-flex">
          {/* <h5 className="py-2 mb-4">آزمون ها</h5> */}
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
        <h4 className="py-2 mb-4">آزمون های ساخته شده </h4>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={hasMoreItems}
          loader={loader}
          threshold={50}
          key={props.Quiz}
        >
          <ListGroup
            className="flex-row-reverse align-items-start flex-wrap justify-content-start border-bottom pb-5"
            key={props.Quiz}
          >
            {items}
            {loadedQuiz.splice(1, numLoadMore).forEach(data => {
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
                      <td>حداکثر درصد : </td>
                      <td style={{ direction: 'ltr' }}>
                        {data.maxRealTime}
                        {data.maxRealTime ? '%' : ''}
                      </td>
                    </tr>
                    <tr className="mb-2" style={{ fontSize: '0.94rem' }}>
                      <td>میانگین درصد : </td>
                      <td style={{ direction: 'ltr' }}>
                        {data.averageRealTime}
                        {data.averageRealTime ? '%' : ''}
                      </td>
                    </tr>
                    <span className="mb-2" style={{ fontSize: '0.94rem' }}>
                      توضیحات : {data.desc}
                    </span>
                  </ExpansionPanelDetails>
                  <ButtonGroup className="direction-left px-3 col-12">
                    <Button
                      className="ml-3 rounded"
                      style={{ fontSize: '0.8rem' }}
                      color="primary"
                      onClick={() => submitQuiz(data, false)}
                    >
                      شروع آزمون
                    </Button>
                  </ButtonGroup>
                </ExpansionPanel>,
              );
            })}
          </ListGroup>
        </InfiniteScroll>
        <h4 className="py-2 mb-4 mt-3">آزمون تصادفی </h4>
        <ExpansionPanel
          defaultExpanded={true}
          className="col-lg-3 col-md-5 col-sm-12 direction-right  mb-5 py-2 mt-0 px-1 offset-lg-1 offset-md-1 offset-sm-0"
          key={1}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <span className={classes.heading}>
              {' '}
              {props.Quiz ? props.Quiz[0].fldName : ''}
            </span>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="py-3 px-3 flex-column">
            <span className="mb-2" style={{ fontSize: '0.94rem' }}>
              زمان آزمون : {props.Quiz ? props.Quiz[0].fldDuration : ''}
            </span>
            <span className="mb-2" style={{ fontSize: '0.94rem' }}>
              تعداد تست ها : {props.Quiz ? props.Quiz[0].testCount : ''}
            </span>
            <span className="mb-2" style={{ fontSize: '0.94rem' }}>
              توضیحات : آزمون تصادفی ساخته شده
            </span>
          </ExpansionPanelDetails>
          <ButtonGroup className="direction-left px-3 col-12">
            <Button
              className="ml-3 rounded"
              style={{ fontSize: '0.8rem' }}
              color="warning"
              onClick={() => submitQuiz(null, true)}
            >
              شروع آزمون
            </Button>
          </ButtonGroup>
        </ExpansionPanel>
      </Col>
      {/* Modal Confirm Delete */}
      {/* <div>
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
      </div> */}
    </>
  );
}

export default LoadQuiz;
