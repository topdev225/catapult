import React, { useRef, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import Series from "./Series";
import { Box, Grid, Hidden, makeStyles } from "@material-ui/core";
import Loader from "../../components/Loader";
import Categories from "./Categories";
import Filters from "./Filters";
import qs from 'qs';

import { loadSeries, seriesAllSelector } from "../../modules/series";

const useStyles = makeStyles(theme => ({
  filterBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  seriesBox: {
    marginBottom: 25,
    maxWidth: 300,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 15,
      marginRight: 15
    }
  }
}));

let loadingMore = false;
const THRESHOLD = 5;

const SeriesAll = ({
  history,
  loadMore,
  seriesFilters,
  ...props
}) => {
  const classes = useStyles();
  const gridEl = useRef();

  const [selectedCategory, setSelectedCategory] = React.useState(() => {
    let filters = qs.parse(history.location.search.substring(1));
    return filters.category || 'all';
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll(e) {
    if (gridEl.current && e.target.scrollingElement) {
      if (
        e.target.scrollingElement.clientHeight +
          e.target.scrollingElement.scrollTop +
          THRESHOLD >=
          e.target.scrollingElement.scrollHeight ||
        loadingMore
      )
        return;
      loadingMore = true;
      loadMore().then(() => {
        loadingMore = false;
      });
    }
  }

  return (
    <>
      <div className={classes.filterBox}>
        <Filters filters={seriesFilters} {...props} selectedCategory={selectedCategory} />
      </div>

      <Hidden smDown>
        <Categories selectedCategory={selectedCategory} onSelectCategory={category => setSelectedCategory(category)} />
      </Hidden>

      <div ref={gridEl}>
        <Grid container spacing={0} justify="center">
          <Loader action={loadSeries} selector={seriesAllSelector}>
            {seriesAll =>
              seriesAll.map(series => (
                <Box key={series.id} className={classes.seriesBox}>
                  <Series series={series} />
                </Box>
              ))
            }
          </Loader>
        </Grid>
      </div>
    </>
  );
};

export default withRouter(SeriesAll);
