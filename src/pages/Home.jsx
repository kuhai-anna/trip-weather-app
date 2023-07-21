import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { TripList } from 'components/TripList/TripList';
import { SearchForm } from 'components/SearchForm/SearchForm';
import { AppBar } from 'components/AppBar/AppBar';

const Home = () => {
  return (
    <div>
      <Section tag={'header'}>
        <AppBar />
      </Section>
      <Section tag={'main'}>
        <Section mainTitle={'Weather'} accentWord={'Forecast'}>
          <SearchForm />
          <TripList />
        </Section>
        <Suspense fallback={<Loader size={'75vh'} />}>
          <Outlet />
        </Suspense>
      </Section>
    </div>
  );
};

export default Home;
