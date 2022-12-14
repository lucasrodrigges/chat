/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import searchIcon from '../assets/icons/search.svg';
import { getPosts, getUsers } from '../services/axios';

import ReducedPostList from './ReducedPostList';
import UserList from './UserList';

let currentSearch;
export default function Sidebar() {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('person');
  const [results, setRetuls] = useState({
    persons: { data: [], lastPage: false },
    posts: { data: [], lastPage: false },
  });

  const fetchResuls = async () => {
    switch (searchType) {
      case 'post': {
        const { data } = await getPosts(currentSearch);
        const lastPage = data.length < 10;

        return setRetuls((prev) => ({ ...prev, posts: { data, lastPage } }));
      }
      default: {
        const { data } = await getUsers(currentSearch);
        const lastPage = data.length < 10;

        return setRetuls((prev) => ({ ...prev, persons: { data, lastPage } }));
      }
    }
  };

  const fetchNext = async () => {
    switch (searchType) {
      case 'post': {
        const offset = results.posts.data.length;
        const { data } = await getPosts(currentSearch, offset);
        const lastPage = data.length < 10;

        return setRetuls((prev) => ({
          ...prev,
          posts:
          { data: [...prev.posts.data, ...data], lastPage },
        }));
      }
      default: {
        const offset = results.persons.data.length;
        const { data } = await getUsers(currentSearch, offset);
        const lastPage = data.length < 10;

        return setRetuls((prev) => ({
          ...prev,
          persons:
          { data: [...prev.persons.data, ...data], lastPage },
        }));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentSearch === search || !search) return;

    currentSearch = search;
    fetchResuls();
  };

  return (
    <section id="sidebar">
      <div className="sidebar-search">
        <form className="search-bar" onSubmit={handleSubmit}>
          <img src={searchIcon} alt="magnifying glass" />
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </form>

        <div className="search-types">
          <input
            type="button"
            value="persons"
            onClick={() => setSearchType('person')}
          />

          <input
            type="button"
            value="posts"
            onClick={() => setSearchType('post')}
          />
        </div>
      </div>

      <SearchResults
        results={results}
        type={searchType}
        nextPage={fetchNext}
      />
    </section>
  );
}

function SearchResults({ results, type, nextPage }) {
  switch (type) {
    case 'post':
      return <ReducedPostList content={results.posts} nextPage={nextPage} />;
    default:
      return <UserList content={results.persons} nextPage={nextPage} />;
  }
}
