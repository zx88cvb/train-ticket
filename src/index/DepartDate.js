import React, {
  useMemo
} from 'react';
import './DepartDate.css';
import dayjs from 'dayjs';
import { h0 } from '../common/fp';

export default function DepartDate(props) {
  const {
    time,
    onClick
  } = props;

  const h0OfDepart = h0(time);

  const departDateString = useMemo(() => {
    return dayjs(h0OfDepart).format('YYYY-MM-DD');
  }, [h0OfDepart]);
  return (
    <div>
      { departDateString }
    </div>
  );
}