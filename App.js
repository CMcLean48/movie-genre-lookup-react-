import React, {Component} from 'react';
import './App.css';
import Movielist from './Movielist';

const API_KEY   = 'f8b5c4c831f66ef931d7c63686ffe0c8';
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY;

const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
             + API_KEY
             + '&language=en-US';

class App extends Component {
    
    constructor() {
        super();
        
        //get current date, plus a date 2 months in past,formatted for the api query.
        let d = new Date(),
            end = d.getFullYear() +'-' + (d.getMonth() + 1) + '-' + d.getDate();

         let e = d.setDate(d.getDate() - 60),
            start=d.getFullYear()+'-' + (d.getMonth() + 1)+'-'+ (d.getDate());

           console.log(e);

        this.state  = {
          apiKey : API_KEY,
          start : start,
          end    : end,
          genre : "28 ",
          page:1,
          loading:'true',
          movies : [],
          genres : [],
          selectedGenre  : '',
          overview: false,
          id : '',
          title: '',
          release_date:'',         
        };
        this.getMovies = this.getMovies.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.nextPage  = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
       
    }
    
    // Called when constructor is finished building component.
    componentDidMount() {
      this.getMovies(this.state.page, this.state.start, this.state.end, this.state.genre);
      this.getGenres();
    }

    handleGenreChange(e) {
      this.setState({ selectedGenre: e.target.value, page: 1 });
     // const url = "http://moviedb.com?genre=" + genre;
   //   alert("Getting movie with genre id: " + genre + " at "
    //      + url  );
    this.getMovies(this.state.page, this.state.start, this.state.end, e.target.value);
    }
    

    getMovies(page,start,end,genre) {
     
        // Build string with base and start and end dates, page number and genre.
        const URL        = BASE_URL + '&primary_release_date.gte=' + start
                         +  '&primary_release_date.lte=' + end 
                         + '&page=' + page 
                         + '&with_genres=' + genre;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                this.setState({movies:data.results});
              //  alert("Total pages= " + data.total_pages)
                console.log(JSON.stringify(data.results));
                
            
              //set how many total pages for this instance of movies//
                this.setState({totalPages : data.total_pages});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);

            });                          
    }

    getGenres() {
        
        // This code gets data from the remote server.
        fetch(GENRES).then(response => response.json())

        // Data is retrieved.
        .then((data) => {
            this.setState({genres:data.genres, loading:false});
          //  console.log(JSON.stringify(data.genres));
        })
        // Data is not retrieved.
        .catch((error) => {
            alert(error);
        });
    }
        //to page forward//
        nextPage(e){
            if(this.state.page < this.state.totalPages){
                let newPage = this.state.page
                newPage = newPage +=1;
                this.setState({page:newPage});
                this.getMovies(newPage, this.state.start, this.state.end,  this.state.genre);

            }     
    }
        //previous page//
        previousPage(e){
        if(this.state.page > 1 ){
            let newPage = this.state.page
            newPage = newPage -=1;
            this.setState({page:newPage});
            this.getMovies(newPage, this.state.start, this.state.end,  this.state.genre);

            }     
    } 
        
    render() {
        return (  
    <div className="container">
            <div className = "titleItem">
                <table> 
                    <tbody>
                         <tr>
                            <td>
                            <img width="60" src="movie_roll.svg" alt="movieroll"></img>
                            </td>
                            <td>
                            <h1>Movie Database Sort By Genre</h1>
                            </td>
                        </tr>
                    </tbody>       
                </table>
            </div>        
            <div >
               {/* Genres */}
               <p className="genreChangetitle">Change Genre</p>
              <select className="selection"type='text' value={this.state.selectedGenre} 
                     onChange={this.handleGenreChange}>                  
                    {this.state.genres.map((item, index)=>(
                <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
              {this.state.selectedGenre}
              <br/>
              
              <div className ="page">
              
              <button  onClick={this.previousPage}>&lt;&nbsp; Previous Page</button>
              <p>&nbsp;Page Number:&nbsp;{this.state.page}&nbsp;of &nbsp;{this.state.totalPages} Pages</p>
              &nbsp;<button onClick={this.nextPage}> Next Page&nbsp;&gt;</button>
              <a className="anchor"href= "#bottom" id="top">go to bottom</a>

             </div>
             
        
          <Movielist movies={this.state.movies}></Movielist>

          <footer>
           
          <button  onClick={this.previousPage}>&lt;&nbsp; Previous Page</button>
          <button onClick={this.nextPage}> Next Page&nbsp;&gt;</button>
          <a className ="anchor"href ="#top" id="bottom">go to top</a>
          <p>© 2018 Crystal McLean</p>
          </footer>

     </div>  
            
                
        </div>  
        );
    }
}
export default App;