import { useEffect, useState, useParams, useNavigate } from 'react';
import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

// eslint-disable-next-line
function Series() {
    // let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const theme1 = useRef(null);
    const theme2 = useRef(null);
    const api_url = `https://api.gdriveplayer.us/v2/series/search?title=${title}`;
    const [data, setData] = useState([]);
    // const mov_download = "https://v2.vidsrc.me/embed/"
    const [value, setValue] = useState("");

    const handleChange = e => {
        setValue(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setTitle(value);
    };

    const handleKeypress = e => {
        if (e.key === 'Enter') {
            setTitle(value);
        }
    };

    const showMovie = async () => {
        const result1 = await fetch("https://api.gdriveplayer.us/v2/series/search?title=");
        const movies1 = await result1.json();
        setData(movies1);
    }

    const searchMovie = useCallback(async () => {
        const result = await fetch(api_url);
        const movies = await result.json();
        setData(movies);
    }, [api_url])

    const handleThemeChange = () => {
        var themeToggleDarkIcon = theme1.current;
        var themeToggleLightIcon = theme2.current;

        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }

        var themeToggleBtn = document.getElementById('theme-toggle');

        themeToggleBtn.addEventListener('click', function () {

            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }

            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }

        });

    }

    useEffect(() => {
        handleThemeChange();
        if (title !== "") searchMovie();
        else { showMovie(); }
    }, [title, searchMovie])

    return (
        <div className='transition-all'>
            <div className='bg-stone-300 dark:bg-slate-800 h-screen overflow-x-hidden'>
                <div className='sm:pb-2 md:pb-10 xl:pb-2 pb-28'>
                    <nav className="bg-sky-900 dark:bg-slate-600 p-5 py-2.5 transition-all ease-in-out absolute w-full z-10">
                        <div className="container flex flex-wrap justify-between items-center transition-all ease-in-out">
                            <a href="/" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
                                <img src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
                                <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">REACTmovie</span>
                            </a>

                            <a href="/anime" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
                                <img src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
                                <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">REACTanime</span>
                            </a>

                            <a href="/series" className="flex py-2 mx-auto sm:mx-0 transition-all ease-in-out">
                                <img src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png" className="mr-3 h-8 sm:h-9" alt="Flowbite Logo" />
                                <span className="transition-all ease-in-out self-center text-xl font-semibold whitespace-nowrap text-white">REACTseries</span>
                            </a>
                            <div className='flex w-full xl:w-2/4'>
                              <div className="relative w-full transition-all ease-in-out rounded-3xl px-6">
                                  <button onClick={handleSubmit} className=' rounded-l-2xl absolute bg-cyan-500 hover:bg-cyan-600'>
                                      <div className="flex inset-y-0 left-2 items-center pointer-events-none">
                                          <svg className="m-[8px] w-5 h-5 text-stone-700" fill='currentColor' aria-hidden="true" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                      </div>
                                  </button>
                                  <input type="text" id="search-navbar" onChange={handleChange} onKeyPress={handleKeypress}  className="p-2 pl-10 w-full text-gray-900 rounded-3xl outline-0 text-sm outline-none" placeholder="Search..." />
                              </div>
                              <button onAuxClick={handleThemeChange} id="theme-toggle" className="transition-all transform text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-100 rounded-lg text-sm scale-125 p-1">
                                  <svg ref={theme2} id="theme-toggle-dark-icon" className="hidden w-5 h-5 -translate-y-[2px] translate-x-[2px]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                  <svg ref={theme1} id="theme-toggle-light-icon" className="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                              </button>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='transition-all transform ease-in-out'>
                    <div className='grid grid-cols-1 gap-8 p-12 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:pt-24 pt-28 transition-all transform ease-in-out float-none'>
                        {
                            data && data.map((records) => {

                                const ids = records.imdb;

                                return (
                                    <div className="flex-wrap group shadow-xl hover:shadow-lg shadow-black rounded-3xl bg-blue-900 overflow-hidden hover:scale-110 duration-500 transition-all ease-in-out" key={ids}><p className='absolute group-hover:block hidden mt-36 mx-20 text-center mx-8 text-black font-extrabold text-lg'>{records.total_episode} Episodes</p>
                                        <Link to={`/series/info/${records.imdb}/${records.title.split(' ').pop()}`}>
                                            <div className='bg-white h-auto transition-all'>
                                                <img src={records.poster} alt="cant_load" className='w-full h-[350px] transition-all overflow-hidden rounded-t-2xl group-hover:opacity-30' />
                                            </div>
                                        </Link>
                                        <div className="px-6 py-4">
                                            <p className="text-white font-bold text-base">
                                                {records.title}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Series;