import React from 'react';
import TextField from '@material-ui/core/TextField';
import {ThemeProvider} from '@material-ui/styles';
import {theme, styles} from '../../util/material-ui-helper';
import {getVideos} from '../../webservices/youTubeServices';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Rodal from 'rodal';
import './style.css';

const Search = (props) => {
  const classes = styles();

  const days = [
    {key: 'sunday', name: 'DOM'},
    {key: 'monday', name: 'SEG'},
    {key: 'tuesday', name: 'TER'},
    {key: 'wednesday', name: 'QUA'},
    {key: 'thursday', name: 'QUI'},
    {key: 'friday', name: 'SEX'},
    {key: 'saturday', name: 'SÁB'},
  ];

  const [dailyAvailability, setDailyAvailability] = React.useState({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
  });

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchEnabled, setSearchEnabled] = React.useState(false);

  const [isModalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (
      dailyAvailability.sunday > 0 &&
      dailyAvailability.monday > 0 &&
      dailyAvailability.tuesday > 0 &&
      dailyAvailability.wednesday > 0 &&
      dailyAvailability.thursday > 0 &&
      dailyAvailability.friday > 0 &&
      dailyAvailability.saturday > 0 &&
      searchTerm.length > 0
    )
      setSearchEnabled(true);
    else setSearchEnabled(false);
  }, [dailyAvailability, searchTerm]);

  return (
    <div className="mainDiv">
      <ThemeProvider theme={theme}>
        <div className="searchWrapper">
          <TextField
            variant="outlined"
            label="Termo da Busca do YouTube"
            className={classes.textField}
            fullWidth
            size="small"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && searchEnabled) setModalVisible(true);
            }}
          />

          <IconButton
            aria-label="search"
            disabled={!searchEnabled}
            style={{marginLeft: 8, width: 55, height: 55}}
            onClick={() => {
              setModalVisible(true);
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </ThemeProvider>

      <h2>Qual sua disponibilidade diária para assistir vídeos?</h2>
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className="dayWrapper">
            <span className="dayName">{day.name}</span>
            <div className="day">
              <input
                value={dailyAvailability[day.key]}
                maxLength="4"
                onChange={(event) => {
                  if (!Number(event.target.value) && event.target.value !== '') return;
                  if (event.target.value === '') event.target.value = '0';

                  if (parseInt(event.target.value) > 1440) event.target.value = '1440';

                  let _dailyAvailability = dailyAvailability;
                  _dailyAvailability[day.key] = parseInt(event.target.value);
                  setDailyAvailability({..._dailyAvailability});
                }}
              />
              <span>min</span>
            </div>
          </div>
        ))}
      </div>

      <SearchModal
        visible={isModalVisible}
        searchTerm={searchTerm}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Search;

const SearchModal = (props) => {
  React.useEffect(() => {
    if (props.visible) {
      getVideos(props.searchTerm);

      //   function count(sentence) {
      //     var list = sentence.split(' ');
      //     var words = {};
      //     for(var i = 0; i < list.length; i++) {
      //         var word = list[i];
      //         if (words.hasOwnProperty(word)) {
      //             words[word]++;
      //         } else {
      //             words[word] = 1;
      //         }
      //     }
      //     return words;
      // }

      // var display = count('ask a question get a question');
      // console.log(display);
    }
  }, [props]);

  return (
    <div style={{zIndex: 50000}}>
      <Rodal
        visible={props.visible}
        closeOnEsc
        onClose={() => {
          props.onClose();
        }}
        customStyles={{
          padding: 0,
          overflow: 'hidden',
          width: '80%',
          height: '80%',
          backgroundColor: 'rgb(40, 40, 40)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
          }}
        >
          {props.searchTerm}
        </div>
      </Rodal>
    </div>
  );
};
