import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import './Detail.css'

const API_KEY = import.meta.env.VITE_API_KEY;

function Detail() {
  const { uri } = useParams();
  const [data, setData] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=uri:("nyt://article/${uri}")&api-key=${API_KEY}`);
      const jsonData = await response.json();
      // for (let i = 0; i < jsonData.results.length; i++) {
      //   const result = jsonData.results[i];
      //   if (result.title === "" || result.title === "Sign Up for the Science Times Newsletter") {
      //     jsonData.results.splice(i, 1);
      //     i--;
      //   }
      // }
      console.log(jsonData.response.docs[0]);
      setData(jsonData.response.docs[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function RenderJSON({ data, level=0 }) {
    const style = { marginLeft: level * 20 };

    if (Array.isArray(data)) {
      return (
        <div style={style}>
          [
          {data.map((item, idx) => (
            <div key={idx}>
              <RenderJSON data={item} level={level + 1} />
            </div>
          ))}
          ]
        </div>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <div style={style}>
          {"{"}
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong>{" "}
              <RenderJSON data={value} level={level + 1} />
            </div>
          ))}
          {"}"}
        </div>
      );
    } else if (data === null) {
      return <span style={style}>null</span>;
    } else if (data === undefined) {
      return <span style={style}>undefined</span>;
    } else {
      return <span style={style}>{String(data)}</span>;
    }
  }

  return (
    <div className='detail-page-container'>
      <Link to="/">
        <button className='detail-back-btn'>
          ← Back to Dashboard
        </button>
      </Link>
      <div className='detail-title'>
        {data?.headline?.main && <h1>{data.section_name === "Opinion" ? "Opinion: " : ""}{data.headline.main}</h1>}
        {data?.snippet && <h3>{data.snippet}</h3>}
        {data?.byline?.original && <span>{data.byline.original}</span>}
        {data?.pub_date && <span>, published on {new Date(data.pub_date).toLocaleDateString()} {new Date(data.pub_date).toLocaleTimeString()}</span>}
      </div>
      <div className='detail-bottom-container'>
        <div className='detail-image'>
          {data?.multimedia?.default?.url && <img src={data.multimedia.default.url}/>}
          {data?.multimedia?.caption && <p>{data.multimedia.caption}</p>}
          {data?.multimedia?.credit && <p>Credit: {data.multimedia.credit}</p>}
        </div>
        <div className='detail-keywords'>
          <h3>Keywords:</h3>
          <ul>
            {data?.keywords && data.keywords.map(({name, value}) => (
              <li>{name + ":   " + value}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className='detail-footer'>
        {data?.web_url && 
          <p>
            {"Click "}
            <a href={data.web_url} target="_blank" rel="noopener">here</a>
            {" for the full NYT article"}
          </p>
        }
      </div>
    </div>
  )
}

export default Detail
