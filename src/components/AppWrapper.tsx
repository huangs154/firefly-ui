import { styled } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ArrayParam, useQueryParam, withDefault } from 'use-query-params';
import { ApplicationContext } from '../contexts/ApplicationContext';
import { FilterContext } from '../contexts/FilterContext';
import { NAMESPACES_PATH } from '../interfaces';
import { Navigation, NAV_WIDTH } from './Navigation/Navigation';

const Main = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  overflow: 'hidden',
});

const ContentDiv = styled('div')({
  paddingLeft: NAV_WIDTH,
});

const RootDiv = styled('div')({
  display: 'flex',
});

export const AppWrapper: React.FC = () => {
  const { pathname } = useLocation();
  const { selectedNamespace } = useContext(ApplicationContext);
  const location = useLocation();
  const [filterAnchor, setFilterAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filterString, setFilterString] = useState('');
  const [filterQuery, setFilterQuery] = useQueryParam(
    'filters',
    withDefault(ArrayParam, [])
  );

  if (pathname === '/') {
    return (
      <Navigate
        to={`/${NAMESPACES_PATH}/${selectedNamespace}home`}
        replace={true}
      />
    );
  }

  // Filter
  useEffect(() => {
    // set filters if they are present in the URL
    if (filterQuery.length !== 0) {
      setActiveFilters(filterQuery as string[]);
    }
  }, [setActiveFilters, filterQuery]);

  useEffect(() => {
    //set query param state
    setFilterQuery(activeFilters);
    if (activeFilters.length === 0) {
      setFilterString('');
      return;
    }

    setFilterString(`&${activeFilters.join('&')}`);
  }, [activeFilters, setFilterQuery]);

  useEffect(() => {
    setFilterString('');
    setActiveFilters([] as string[]);
  }, [location]);

  return (
    <RootDiv>
      <FilterContext.Provider
        value={{
          filterAnchor,
          setFilterAnchor,
          activeFilters,
          setActiveFilters,
          filterString,
          setFilterString,
          filterQuery,
          setFilterQuery,
        }}
      >
        <Main>
          <Navigation />
          <ContentDiv>
            <Outlet />
          </ContentDiv>
        </Main>
      </FilterContext.Provider>
    </RootDiv>
  );
};
