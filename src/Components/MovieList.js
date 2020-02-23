import React from "react";
import { connect } from "react-redux";

import { getMovies } from "../Actions/movieActions";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //get movies from /movies/:location endpoint
    this.props.getMoviesProps(this.props.user.location);
    setTimeout(() => {
      console.log(this.props);
      //   this.setState({
      //     theaterList: this.props.theaters
      //   });
    }, 500);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.user.location);
    // console.log(nextProps);
    if (this.props.user.location !== prevProps.user.location) {
      this.props.getMoviesProps(this.props.user.location, () => {
        console.log(this.props);
      });
    }
  }
  render() {
    //console.log(this.state.theaterList);
    return (
      <>
        <div style={{ color: "white" }}>
          {JSON.stringify(this.props.theaters)}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  theaters: state.Theaters.theaters
});

const mapActionsToProps = {
  getMoviesProps: getMovies
};

export default connect(mapStateToProps, mapActionsToProps)(MovieList);
