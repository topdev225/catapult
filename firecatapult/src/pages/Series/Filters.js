import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Hidden,
  makeStyles,
  MenuItem,
  Select,
  withStyles,
  Slider
} from "@material-ui/core";
import qs from 'qs';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#fff",
    border: "1px solid #c4c4c4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2, 2.5)
  },
  filterBy: {
    color: "#3e464c",
    fontSize: "12px",
    fontWeight: 500
  },
  filterBox: {
    [theme.breakpoints.up("lg")]: {
      marginRight: theme.spacing(2.5)
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 1),
      marginBottom: theme.spacing(1),
      "& > div": {
        width: "100%"
      }
    }
  },
  checkboxes: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(2.5)
    }
  }
}));

const StyledSelect = withStyles(theme => ({
  select: {
    border: "1px solid #673AB7",
    fontSize: "14px",
    paddingLeft: theme.spacing(2),
    textTransform: "uppercase",
    padding: theme.spacing(1.25, 4, 1.25, 2),
    color: "#673ab7",
    minWidth: "50px",
    textAlign: "left"
  },
  icon: {
    color: "#673ab7",
    right: "5px"
  }
}))(Select);

const StyledSlider = withStyles({
  root: {
    color: '#673ab7',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0px 2px 2px',
    '&:focus,&:hover,&$active': {
      boxShadow: '#ccc 0px 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

function formatAvgLength(x) {
  const hours = parseInt(x / 60);
  const mins = parseInt(x % 60);
  return `${parseInt(hours / 10)}${parseInt(hours % 10)}:${parseInt(mins / 10)}${parseInt(mins % 10)}`;
}

const StyledFormControlLabel = withStyles(theme => ({
  label: {
    color: "#673ab7",
    fontWeight: 500,
    fontSize: "14px"
  }
}))(FormControlLabel);

const initialState = {
  category: 'all',
  hosts: 'all',
  average_length__range: '1,1440',
  channels: 'all',
  delivered: 'all',
  recommended_age__range: '12,99',
  content_stale: '',
  gender: 'all'
};

const Filters = ({
  filters,
  history,
  loadSeries,
  selectedCategory
}) => {
  const classes = useStyles();
  const [selectedFilers, setSelectedFilters] = React.useState(() => {
    const filters = qs.parse(history.location.search.substring(1))
    return {
      ...initialState,
      ...filters
    };
  });

  const [popupInSearch, setPopupInSearch] = React.useState(false);

  const [recommendedAgeRange, setRecommendedAgeRange] = React.useState(() => {
    const filters = qs.parse(history.location.search.substring(1))
    return filters.recommended_age__range || initialState.recommended_age__range;
  });

  const [avgLengthRange, setAvgLengthRange] = React.useState(() => {
    const filters = qs.parse(history.location.search.substring(1))
    return filters.average_length__range || initialState.average_length__range;
  });

  function handleSelectFilter (e) {
    setSelectedFilters({
      ...selectedFilers,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    let filters = qs.parse(history.location.search.substring(1))
    if (filters.popup) {
      setPopupInSearch(true);
      return;
    }
    if (popupInSearch && !filters.popup) {
      setPopupInSearch(false);
      return;
    }
    filters = Object.keys(filters)
      .map(key => {
        if (key !== 'recommended_age__range') {
          return (filters[key] === 'all' || !filters[key])
            ? {}
            : {
              [key]: filters[key]
            }
        } else {
          return {
            min_recommended_age__range: filters[key],
            max_recommended_age__range: filters[key]
          }
        }
      })
      .reduce((result, filter) => ({
        ...result,
        ...filter
      }), {})

    loadSeries(filters)
  }, [history.location.search])

  useEffect(() => {
    history.push('/series?' + qs.stringify(selectedFilers))
  }, [selectedFilers])

  useEffect(() => {
    setSelectedFilters({
      ...selectedFilers,
      category: selectedCategory
    });
  }, [selectedCategory]);

  const {
    hosts,
    delivered,
    channels,
    gender,
    content_stale
  } = selectedFilers

  const min_recommended_age__range = Number(recommendedAgeRange.split(',')[0])
  const max_recommended_age__range = Number(recommendedAgeRange.split(',')[1])

  const min_average_length__range = Number(avgLengthRange.split(',')[0])
  const max_average_length__range = Number(avgLengthRange.split(',')[1])

  return (
    <Box textAlign="center">
      <Box className={classes.container}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Hidden mdDown>
              <Box mr={2.5} className={classes.filterBy}>
                Filter By:
              </Box>
            </Hidden>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='hosts' value={hosts} onChange={handleSelectFilter}>
                <MenuItem value={"all"}>Creators</MenuItem>
                {(filters.hosts || []).map((host, index) => (
                  <MenuItem value={host} key={index}>{host}</MenuItem>
                ))}
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='average_length__range' value='all' onChange={handleSelectFilter}>
                <MenuItem value={"all"}>
                  {(min_average_length__range === 1 && max_average_length__range === 1440)
                    ? 'Avg. Length'
                    : `Avg. Length (${formatAvgLength(min_average_length__range)} - ${formatAvgLength(max_average_length__range)})`}
                </MenuItem>
                <MenuItem>
                  <div style={{ width: 140 }}>
                    <StyledSlider
                      ThumbComponent={AirbnbThumbComponent}
                      aria-label="avg length slider"
                      min={1}
                      max={1440}
                      value={[min_average_length__range, max_average_length__range]}
                      onChange={(e, value) => {
                        setAvgLengthRange(value.join(','));
                      }}
                      onChangeCommitted={(e, value) => {
                        setSelectedFilters({
                          ...selectedFilers,
                          average_length__range: value.join(',')
                        });
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                </MenuItem>
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='channels' value={channels} onChange={handleSelectFilter}>
                <MenuItem value={"all"}>Formats</MenuItem>
                {(filters.format || []).map((format, index) => (
                  <MenuItem value={format} key={index}>{format}</MenuItem>
                ))}
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='delivered' value={delivered} onChange={handleSelectFilter}>
                <MenuItem value={"all"}>Delivered</MenuItem>
                <MenuItem value={"Daily"}>Daily</MenuItem>
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
                <MenuItem value={"Bi-Weekly"}>Bi-Weekly</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='recommended_age__range' value='all'>
                <MenuItem value={"all"}>
                  {(min_recommended_age__range === 12 && max_recommended_age__range === 99)
                    ? 'Age'
                    : `Age (${min_recommended_age__range} - ${max_recommended_age__range})`}
                </MenuItem>
                <MenuItem>
                  <div style={{ width: 140 }}>
                    <StyledSlider
                      ThumbComponent={AirbnbThumbComponent}
                      aria-label="age range slider"
                      min={12}
                      max={99}
                      value={[min_recommended_age__range, max_recommended_age__range]}
                      onChange={(e, value) => {
                        setRecommendedAgeRange(value.join(','));
                      }}
                      onChangeCommitted={(e, value) => {
                        setSelectedFilters({
                          ...selectedFilers,
                          recommended_age__range: value.join(',')
                        });
                      }}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                </MenuItem>
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md="auto">
            <Box className={classes.filterBox}>
              <StyledSelect name='gender' value={gender} onChange={handleSelectFilter}>
                <MenuItem value={"all"}>Gender</MenuItem>
                <MenuItem value={"M"}>Male</MenuItem>
                <MenuItem value={"F"}>Female</MenuItem>
              </StyledSelect>
            </Box>
          </Grid>

          <Grid item md={12} lg="auto">
            <Box className={classes.checkboxes}>
              <StyledFormControlLabel
                labelPlacement="start"
                label="Evergreen: "
                control={
                  <Checkbox
                    checked={content_stale === 'evergreen'}
                    onChange={e => setSelectedFilters({
                      ...selectedFilers,
                      content_stale: e.target.checked ? 'evergreen' : ''
                    })}
                    value="checkedEvergreen"
                    color="primary"
                  />
                }
              />
              <StyledFormControlLabel
                labelPlacement="start"
                label="News: "
                control={
                  <Checkbox
                  checked={content_stale === 'news'}
                    onChange={e => setSelectedFilters({
                      ...selectedFilers,
                      content_stale: e.target.checked ? 'news' : ''
                    })}
                    value="checkedNews"
                    color="primary"
                  />
                }
              />{" "}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default withRouter(Filters);
