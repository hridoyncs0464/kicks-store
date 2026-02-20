import React from 'react';
import HeroSlidder from '../home/HeroSlidder';
import NewDrops from '../home/NewDrops';
import Categories from '../home/Categories';
import Reviews from '../home/Reviews';

const Home = () => {
    return (
       <main>
        <HeroSlidder></HeroSlidder>
        <NewDrops></NewDrops>
        <Categories></Categories>
        <Reviews>
            
        </Reviews>
       </main>
    );
};

export default Home;