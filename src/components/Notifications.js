import React from 'react';
import PropTypes from 'utils/propTypes';
import { Media } from 'reactstrap';
import Avatar from 'components/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Image from '../assets/img/users/notification.jfif';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Notifications = ({ notificationsData, countNew, deleteNotification }) => {
  return (
    notificationsData &&
    notificationsData.length &&
    notificationsData.map(
      (
        {
          fldComment,
          fldDateShamsi,
          fldIsApprove,
          fldPkTestBook,
          fldRejectType,
          fldTestBookName,
          fldCoverAddress,
        },
        index,
      ) => (
        <Media
          key={index}
          className="py-2 border-bottom"
          // style={{ borderBottom: '1px solid gray' }}
        >
          {/* <Media left className="align-self-center px-2">
              <Tooltip
                className="btn-wrapper-notification"
                title={<span className="">حذف</span>}
              >
                <IconButton
                  aria-label="info"
                  // onClick={handleTooltipOpen}
                >
                  <CloseIcon className="can-click table-icon-delete" />
                </IconButton>
              </Tooltip>
            </Media> */}
          <Media left className="align-self-center px-2">
            <Avatar
              tag={Media}
              object
              src={fldCoverAddress ? fldCoverAddress : Image}
              alt="Avatar"
              className="rounded"
              style={{ width: '45px', height: '45px' }}
            />
          </Media>
          <Media
            body
            middle
            className="align-self-center"
            style={{
              fontFamily: 'IRANSans',
              fontSize: '13px',
              line: '1.5rem',
            }}
          >
            {index + 1 <= countNew[0].countNotSeen ? (
              <span
                className="bg-secondary text-white rounded px-1 mb-1 d-inline-flex"
                style={{
                  fontSize: '10.5px',
                  opacity: '0.84',
                  paddingBottom: '2px',
                  paddingTop: '2px',
                }}
              >
                جدید
              </span>
            ) : null}

            <p className="mt-1">
              کتاب <span className="font-weight-bold">{fldTestBookName}</span>{' '}
              توسط ادمین{' '}
              {fldIsApprove === 0 ? (
                <span className="text-secondary font-weight-bold">
                  تایید نشد
                </span>
              ) : fldIsApprove === 1 ? (
                <span className="text-success font-weight-bold"> تایید شد</span>
              ) : null}{' '}
              {fldIsApprove === 0 ? (
                <span>
                  <br></br>
                  <span>
                    بدلیل{' '}
                    <span className="font-weight-bold">{fldRejectType}</span>{' '}
                    نامناسب
                  </span>
                  <br></br>
                  {fldComment ? <span>توضیحات : {fldComment}</span> : null}
                </span>
              ) : null}
            </p>
          </Media>
          <Media right className="align-self-center">
            <Media left className="align-self-center ">
              <Tooltip
                className="btn-wrapper-notification"
                title={<span className="">حذف</span>}
              >
                <IconButton
                  aria-label="info"
                  onClick={() => deleteNotification(fldPkTestBook)}
                >
                  <CloseIcon
                    className="can-click table-icon-delete"
                    style={{ width: '0.77em', height: '0.77em' }}
                  />
                </IconButton>
              </Tooltip>
            </Media>
            <small className="text-muted">{fldDateShamsi}</small>
          </Media>
        </Media>
      ),
    )
  );
};

Notifications.propTypes = {
  notificationsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.ID,
      avatar: PropTypes.string,
      message: PropTypes.node,
      date: PropTypes.date,
    }),
  ),
};

Notifications.defaultProps = {
  notificationsData: [],
  countNew: [],
};

export default Notifications;
