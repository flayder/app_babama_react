import { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import styles from './AppDatepicker.module.scss';

import 'react-datepicker/dist/react-datepicker.css';
import { AppIconSprite } from './Icon_sprite/AppIconSprite';

interface AppDatepickerProps {
  startDate?: Date | null
  endDate?: Date | null
  format?: string
  onCompleted: (start: string, end: string) => void
}

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export function AppDatepicker({
    startDate = null,
    endDate = null,
    format = 'mm/dd/yyyy',
    onCompleted,
  }: AppDatepickerProps) {
  const [startDat, setStartDate] = useState(startDate);
  const [endDat, setEndDate] = useState(endDate);

  const locale : any = {
    localize: {
      day: (n:number) => days[n],
      month: (n:number) => months[n],
    },
    multidate: true,
    formatLong: {
      date: () => format,
    },
  };

  return (
    <div className={styles.datepicker_block}>
      <div className="input pad period">
        <AppIconSprite className={styles.svg_default} name="acc-calendar" />
        <span>
          Период
        </span>
      </div>
      {
        startDat
          ? (
            <div className="input datepicker_block">
              <div className={styles.datepicker}>
                <span className="wrap">
                  <AppIconSprite className={styles.svg_white} name="acc-calendar" />
                  <span>
                    {startDat ? moment(startDat).format('L') : <></>}
                    {endDat ? `- ${moment(endDat).format('L')}` : <></>}
                  </span>
                </span>
              </div>
            </div>
          )
          : <></>
      }
      <DatePicker
        locale={locale}
        selected={startDat}
        startDate={startDat}
        endDate={endDat}
        selectsRange
        onChange={(date:any) => {
          const [start, end] = date;
          setStartDate(start);
          setEndDate(end);
          if (start && end) {
            onCompleted(moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
          }
        }}
      />
    </div>
  );
}
