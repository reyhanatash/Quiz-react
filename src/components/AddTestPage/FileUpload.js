import React, { useEffect, useState } from 'react';
import { Row, Label, Table, Button } from 'reactstrap';
import FileBase64 from 'react-file-base64';
import alertify from 'alertifyjs';
import { connect } from 'react-redux';
import { apiActions } from '../../_actions';
import Preview from './FileUploadPreview';

function FileUpload(props) {
  /////////////////////////////////////////// File Uploader //////////////////////////////////////////////
  const fileUpload = React.createRef();
  const [file, updateFile] = useState([]);

  //   Add File To List
  const getFiles = files => {
    console.log(files);
    if (
      !files[0].type.includes('video') &&
      !files[0].type.includes('image') &&
      !files[0].type.includes('audio')
    ) {
      alertify.error('فایل میتواند عکس , ویدیو یا صدا باشد');
      return;
    }
    const newFiles = [...file];
    const findVideo = newFiles.findIndex(file => file.type.includes('video'));
    const findImage = newFiles.findIndex(file => file.type.includes('image'));
    const findAudio = newFiles.findIndex(file => file.type.includes('audio'));
    if (newFiles.length > 1) {
      alertify.error('شما فقط میتوانید دو فایل آپلود کنید');
      return;
    }
    if (
      (findVideo !== -1 &&
        findImage === -1 &&
        findAudio === -1 &&
        newFiles.length === 1) ||
      (findImage !== -1 &&
        findAudio !== -1 &&
        findVideo === -1 &&
        newFiles.length === 2) ||
      (findImage !== -1 && files[0].type.includes('video')) ||
      (findAudio !== -1 && files[0].type.includes('video')) ||
      newFiles.length > 1
    ) {
      alertify.error(
        'شما فقط میتوانید یک ویدیو یا یک عکس همراه صداد آپلود کنید',
      );
      return;
    } else {
      const { name, type, size, base64 } = files[0];
      const Id = props.editMode ? -1 : -1;
      const TestMasterId = props.TestMasterId;
      // props.dispatch(
      //   apiActions.uploadFile(Id, TestMasterId, name, type, size, base64),
      // );
      newFiles.push(...files);
      updateFile(newFiles);
      props.updateFiles(newFiles);
      alertify.success('فایل با موفقیت آپلود شد');
    }
    // const { name, type, size, base64 } = files[0];
    // props.dispatch(apiActions.uploadFile(name, type, size, base64));
  };
  //   Delete File From List
  const deleteFile = selected => {
    console.log(selected);
    console.log(selected.id);
    props.dispatch(apiActions.deleteFile(selected.id));
    const newFiles = [...file];
    newFiles.splice(newFiles.indexOf(selected), 1);
    updateFile(newFiles);
  };
  // Reset
  useEffect(() => {
    if (props.uploadFile && props.uploadFile.length === 0) {
      updateFile([]);
    }
  }, [props.uploadFile]);
  // Show Preview File
  useEffect(() => {
    if (props.selectedTest) {
      updateFile(props.selectedTest.media);
      console.log(props.selectedTest.media);
    }
  }, [props.selectedTest]);
  const [base64data, updatebase64data] = React.useState('');
  const [fileType, updatefileType] = React.useState('');
  const showFile = file => {
    console.log(file);
    updatefileType(file.type);
    props.dispatch(apiActions.loadFile(file.fldMediaAddress));
    // if (!props.loadFile && props.loadFile === undefined) {
    //   updatebase64data(file.base64);
    // }
    updatebase64data(file.base64);
    setTimeout(() => {
      handleClickOpen();
    }, 50);
  };
  useEffect(() => {
    if (props.loadFile && props.editMode) {
      updatebase64data(URL.createObjectURL(props.loadFile));
      // handleClickOpen();
    }
  }, [props.loadFile]);
  useEffect(() => {
    fileUpload.current._reactInternalFiber.child.stateNode.setAttribute(
      'id',
      'fileUpload',
    );
    fileUpload.current._reactInternalFiber.child.stateNode.setAttribute(
      'style',
      'display : none',
    );
  });

  // Modal Preview File
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Row className="col-12 my-2 py-2 px-1 mx-0">
        <div className="direction-right w-100 col-md-11 mt-2 text-right mx-auto d-flex flex-column px-0">
          <Label className="mb-3 bg-light p-2">پاسخنامه </Label>
          <div className="d-flex flex-column justify-content-between align-items-start">
            <FileBase64
              multiple={true}
              onDone={getFiles}
              id="fileUpload"
              ref={fileUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="fileUpload">
              <span
                className="btn btn-small btn-lightBlue btn-upload cursor-pointer mb-3"
                style={{ fontSize: '0.84rem' }}
              >
                آپلود فایل
              </span>
              {/* <span>{file.length !== 0 ?file.name : null}</span> */}
            </label>
            <Table
              size="sm"
              style={{ fontSize: '13.5px' }}
              key={props.editMode ? props.selectedTest : file}
            >
              <tbody>
                {/* {props.editMode &&
                props.selectedTest &&
                props.selectedTest.media &&
                props.selectedTest.media.length !== 0 &&
                props.selectedTest.media[0].fldMediaAddress !== null
                  ? props.selectedTest.media.map((file, index) => {
                      return (
                        <tr
                          className="d-flex flex-wrap justify-content-between table-file border-top flex-md-column flex-lg-row align-items-center"
                          key={index}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{file.fldMediaName}</td>
                          <td>{file.size}</td>
                          <td className="text-left">
                            <span
                              className="btn btn-light text-primary  cursor-pointer ml-2"
                              style={{ fontSize: '13px' }}
                              onClick={() => {
                                showFile(file);
                                setFileName(file.fldMediaName);
                              }}
                            >
                              پیش نمایش
                            </span>
                            <span
                              className="btn btn-light text-secondary cursor-pointer "
                              style={{ fontSize: '13px' }}
                              onClick={() => deleteFile(file)}
                            >
                              حذف
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  : null} */}
                {file && file.length !== 0
                  ? file.map((file, index) => {
                      return (
                        <tr
                          className="d-flex flex-wrap justify-content-between table-file border-top flex-md-column flex-lg-row align-items-center"
                          key={index}
                        >
                          <th scope="row">{index + 1}</th>
                          <td>{file.name}</td>
                          {/* <td>{file.size}</td> */}
                          <td className="text-left">
                            <span
                              className="btn btn-light text-primary  cursor-pointer ml-2"
                              style={{ fontSize: '13px' }}
                              onClick={() => {
                                showFile(file);
                                setFileName(file.name);
                              }}
                            >
                              پیش نمایش
                            </span>
                            <span
                              className="btn btn-light text-secondary cursor-pointer "
                              style={{ fontSize: '13px' }}
                              onClick={() => deleteFile(file)}
                            >
                              حذف
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </Table>
          </div>
        </div>
      </Row>
      <Preview
        handleClose={handleClose}
        open={open}
        name={fileName}
        loadFile={props.loadFile}
        base64data={base64data}
        fileType={fileType}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    uploadFile: state.api.uploadFile,
    loadFile: state.api.loadFile,
  };
}
export default connect(mapStateToProps)(FileUpload);
