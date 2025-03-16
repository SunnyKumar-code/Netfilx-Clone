import React, { useRef, useState, useEffect, useMemo } from 'react'
import MovieCard from './MovieCard'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const MovieList = ({ title, movies, searchMovie = false }) => {
    const [showControls, setShowControls] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const sliderRef = useRef(null);

    // Memoize the movies to prevent unnecessary re-renders
    const memoizedMovies = useMemo(() => movies || [], [movies]);

    // Check if movies are loaded
    useEffect(() => {
        if (memoizedMovies && memoizedMovies.length > 0) {
            // Add a small delay to ensure smooth transition
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [memoizedMovies]);

    // Check scroll position to update arrow visibility
    const checkScrollPosition = () => {
        const container = sliderRef.current;
        if (!container) return;

        // Check if we can scroll left
        setCanScrollLeft(container.scrollLeft > 20);

        // Check if we can scroll right
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 20
        );
    };

    useEffect(() => {
        const container = sliderRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollPosition);
            // Initial check
            checkScrollPosition();
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, [memoizedMovies]);

    // Render loading skeleton
    const renderSkeleton = () => {
        return Array(6).fill(0).map((_, index) => (
            <div
                key={`skeleton-${index}`}
                className="flex-shrink-0 w-36 sm:w-40 md:w-48 h-52 sm:h-60 md:h-72 bg-gray-800 rounded-md overflow-hidden"
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin"></div>
                </div>
            </div>
        ));
    };

    // If movies is undefined or null, show a placeholder
    if (!memoizedMovies || memoizedMovies.length === 0) {
        return (
            <div className='px-4 sm:px-6 mb-12'>
                <h1 className={`${searchMovie ? "text-black" : "text-white"} text-2xl sm:text-3xl py-3 font-bold`}>{title}</h1>
                <div className='flex overflow-x-auto no-scrollbar pb-8 pt-2 gap-4'>
                    {renderSkeleton()}
                </div>
            </div>
        );
    }

    const slide = (direction) => {
        const container = sliderRef.current;
        if (!container) return;

        const scrollAmount = direction === 'left'
            ? container.scrollLeft - (container.offsetWidth - 100)
            : container.scrollLeft + (container.offsetWidth - 100);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className='mb-12 relative group'
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h1 className={`${searchMovie ? "text-black" : "text-white"} text-2xl sm:text-3xl py-3 font-bold px-4 sm:px-0`}>{title}</h1>

            {/* Left Arrow */}
            <button
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-70 text-white p-2 rounded-r-full transition-all duration-300 
                ${showControls && canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'} 
                hover:bg-red-600`}
                onClick={() => slide('left')}
                aria-label="Scroll left"
                disabled={!canScrollLeft}
            >
                <IoIosArrowBack size={24} />
            </button>

            {/* Right Arrow */}
            <button
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-70 text-white p-2 rounded-l-full transition-all duration-300 
                ${showControls && canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} 
                hover:bg-red-600`}
                onClick={() => slide('right')}
                aria-label="Scroll right"
                disabled={!canScrollRight}
            >
                <IoIosArrowForward size={24} />
            </button>

            <div
                ref={sliderRef}
                className='flex overflow-x-auto no-scrollbar pb-8 pt-2 px-4 sm:px-0 scroll-smooth gap-4'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {isLoading ? renderSkeleton() :
                    memoizedMovies.map((movie) => (
                        <div
                            key={movie.id || `movie-${Math.random()}`}
                            className="flex-shrink-0 transition-transform duration-300 hover:z-10"
                        >
                            <MovieCard
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                rating={movie.vote_average}
                                overview={movie.overview}
                                year={movie.year}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList