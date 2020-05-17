import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import {theme, styles} from '../../util/materialUIHelper';
import {getVideos} from '../../webservices/youTubeServices';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {
  convertMinutesToContinuousDays,
  sortVideosConsideringDailyAvailability,
  countKeyWords,
} from '../../util/helperFunctions';
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
          <FormControl variant="outlined" fullWidth className={classes.textField}>
            <InputLabel>Termo de Busca do YouTube</InputLabel>
            <OutlinedInput
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter' && searchEnabled) setModalVisible(true);
              }}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
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
                </InputAdornment>
              }
              labelWidth={208}
            />
          </FormControl>
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
        dailyAvailability={dailyAvailability}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
};

export default Search;

const SearchModal = (props) => {
  React.useEffect(() => {
    async function _getVideos() {
      // TODO Try catch pra tratar exceção
      let videos = await getVideos(props.searchTerm);
      let allMinutes = 0;

      videos = videos.filter(
        (video) =>
          video.duration.minutes <=
          props.dailyAvailability[
            Object.keys(props.dailyAvailability).reduce((a, b) =>
              props.dailyAvailability[a] > props.dailyAvailability[b] ? a : b
            )
          ]
      );

      videos.forEach((video) => {
        allMinutes += video.duration.minutes;
      });

      const videoTitles = videos.map((video) => video.title).join(' ');
      const videoDescriptions = videos.map((video) => video.description).join(' ');

      const countTitleKeyWords = countKeyWords(videoTitles);
      const countTitleKeyWordsArray = [];
      for (let key in countTitleKeyWords) {
        if (!/^[^a-zA-Z0-9]+$/.test(key) && key !== '' && key.length >= 3) {
          countTitleKeyWordsArray.push({
            word: key,
            occurrences: countTitleKeyWords[key],
          });
        }
      }

      const countDescriptionKeyWords = countKeyWords(videoDescriptions);
      const countDescriptionKeyWordsArray = [];
      for (let key in countDescriptionKeyWords) {
        if (!/^[^a-zA-Z0-9]+$/.test(key) && key !== '' && key.length >= 3) {
          countDescriptionKeyWordsArray.push({
            word: key,
            occurrences: countDescriptionKeyWords[key],
          });
        }
      }

      // Verifica ocorrências de uma mesma palavra nos títulos e descrições
      console.log({
        titleOccurrences: countTitleKeyWordsArray.sort((a, b) =>
          a.occurrences > b.occurrences ? -1 : b.occurrences > a.occurrences ? 1 : 0
        ),
        descriptionOccurences: countDescriptionKeyWordsArray.sort((a, b) =>
          a.occurrences > b.occurrences ? -1 : b.occurrences > a.occurrences ? 1 : 0
        ),
      });

      // Conversão de Minutos Bruta
      console.log(convertMinutesToContinuousDays(allMinutes));

      // Conversão Considerando Disponibilidade do Usuário
      console.log(sortVideosConsideringDailyAvailability(videos, props.dailyAvailability));
    }

    if (props.visible) {
      _getVideos();
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
