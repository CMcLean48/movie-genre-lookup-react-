import React from 'react';
import './App.css'
class Movielist extends React.Component{
  constructor(){
  super();
  this.state={
    selectedOverviewID:null,

  };
  this.showOverview = this.showOverview.bind(this);
}
   showOverview(id){
      // Change back to null if current item already selected.
       if(id === this.state.selectedOverviewID) {
          this.setState({selectedOverviewID:null});
       }
       else {
          // store id of selected item.
          this.setState({selectedOverviewID:id});
       }

     }

 render(){ 
    return(
        <div>
        {/* To show image add http://image.tmdb.org/t/p/w185/ to file name */}
        { /*   <img src="http://image.tmdb.org/t/p/w185/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg"></img> */}
        <ul className="movieList">
        {this.props.movies.map((item)=>(
          <li className = "movie-item" key={item.id}> 
          <h3 className = "movie-title">{item.title}</h3>
          <p>release date:{item.release_date}</p>
        
         <img className ="movie-poster" src={"http://image.tmdb.org/t/p/w185" + item.poster_path}alt = {item.title + '_poster'}/>
        {/*spare code in case show/hide of overview doesn't work*/}
        {/* <p className ="movie-overview">{item.overview}</p>*/}

      <button onClick={(e)=>this.showOverview(item.id)}>show details
         </button> 
         {item.id === this.state.selectedOverviewID ? <p className ="movie-overview">{item.overview}</p> : <p></p> }

           </li>
        ))}
        </ul> 
        </div>);

        }
}
 
 export default Movielist;