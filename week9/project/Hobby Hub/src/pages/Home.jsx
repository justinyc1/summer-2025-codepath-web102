import { Link } from 'react-router'
import './Home.css'

// map website, can create list of things to go, can share with friends, can display on a map
// title and summary of website
// links to create and explore
function Home() {

  return (
    <div className='homepage-container'>
        <h1 className='page-title'>Welcome to PostMySpot!</h1>
        <h2>Share your favorite spots and hidden gems!</h2>
		<div className='nav-buttons-container'>
			<Link to="/create">
				<button>Create a Post</button>
			</Link>
			<Link to="/explore">
				<button>Explore all Posts</button>
			</Link>
		</div>
    </div>
  )
}

export default Home
