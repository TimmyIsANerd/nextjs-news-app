import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function Home() {

  const [query, setQuery] = useState('World War 3');
  const [response, setResponse] = useState<any[] | null>(null);
  const [btnText, setBtnText] = useState('Search');

  const fetchNews = async (e: any) => {
    e.preventDefault();
    try {
      setBtnText('Searching...');
      const res = await axios.get('/api/news', {
        params: {
          query
        }
      });
      setResponse(res.data.value);
    } catch (err) {
      console.log(err)
    }
    setBtnText('Search');
  }

  return (
    <div>
      <Head>
        <title>HEX News App | RAPID API Project</title>
      </Head>
      <div className="flex flex-col items-center relative min-h-screen bg-background">

        <h2 className="font-raleway font-bold text-6xl text-primary pt-20 pb-6 md:text-3xl">
          HEX <span className="text-active">News</span> App
        </h2>

        <h3 className="text-secondary text-2xl font-raleway font-bold uppercase tracking-wide mb-12 md:text-base md:px-4 md:text-center mx-5">
          Get the latest news
        </h3>

        <div className="flex flex-col justify-between items-center w-full md:items-center">
          <form action="" className="flex w-full justify-center md:flex-col md:w-5/6">
            <input
              type="text"
              autoFocus={true}
              className="border-none outline-none focus:ring-2 focus:ring-active w-2/5 bg-primary px-4 py-2 rounded-sm font-raleway md:w-full"
              placeholder='Search for anything...'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />

            <button className="outline-none border border-active font-bold font-raleway ml-4 px-12 py-2 rounded-sm bg-active text-primary transition duration-300 hover:bg-background hover:text-black md:ml-0 md:mt-4"
            onClick={fetchNews}
            >
              {btnText}
            </button>
          </form>

          {response && (
            <div className="flex flex-wrap justify-center mt-4 font-light text-primary font-raleway w-5/6 rounded-sm cursor-pointer md:w-80 md:h-40 ">
              {response.map(res => {
                return (
                  <div className='w-2/6 h-72 border-2 border-active mx-6 my-16' key={res.id}>
                    <a href={res.url} className="inline-block w-full h-full">
                      <img src={res.image.url} alt={res.title} className="w-full h-full object-cover" />

                      <div className="flex justify-center w-full mt-4">
                        <h3 className='w-5/6 text-center'>
                          {res.title}
                        </h3>
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-10 justify-center">
          <p className="block mt-10 mb-10 text-center text-secondary text-xs">
            Made by Adefeyitimi Adeyeloja
            <a href="https://github.com/TimmyIsANerd/nextjs-news-app" className="hover:text-active"> Check it out on GitHub</a>
          </p>
        </div>
      </div>
    </div>
  )
}