import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import Error from '../components/Error';
import fetch from '../utils/fetch';
import './styles.scss';
import Avatar from 'avataaars';

type PersonProps = {
  id: string;
};

type WorldProps = {
  id: string;
};

export default function Person() {
  const state = useLocation().state as PersonProps;
  return (
    <>
      <Header />
      <FetchPerson id={state.id} />
    </>
  );
}

function FetchPerson({ id }: PersonProps) {
  const { isLoading, error, data } = useQuery(`person-${id}`, () =>
    fetch(`https://swapi.dev/api/people/${id}`),
  );

  return isLoading ? (
    <div className="Person-body">
      <Loader />
    </div>
  ) : error ? (
    <div className="Person-body">
      <Error error={'Erro de API'} />
    </div>
  ) : (
    <>
      <div className="Person-body">
        <div className="Person">
          <div className="Person-card">
            <div className="Card-avatar">
              <Avatar
                style={{ width: '90px', height: '90px' }}
                avatarStyle="Circle"
                topType={
                  data.gender === 'male'
                    ? 'ShortHairShortWaved'
                    : data.gender === 'female'
                    ? 'LongHairMiaWallace'
                    : 'NoHair'
                }
                accessoriesType="Blank"
                hairColor={handleHairColor(data.hair_color)}
                facialHairType={
                  data.gender === 'male' ? 'BeardMedium' : 'Blank'
                }
                facialHairColor={handleHairColor(data.hair_color)}
                clotheType="GraphicShirt"
                clotheColor="Black"
                graphicType="Deer"
                eyeType="Squint"
                eyebrowType="Default"
                mouthType="Smile"
                skinColor={handleSkinColor(data.skin_color)}
              />
            </div>
            <div className="Card-info">
              <div className="Head">
                <h2>{data.name}</h2>
                <p>
                  🪐{' '}
                  {
                    <FetchWorld
                      id={data.homeworld.replace(/\D/g, '')}
                      key={`homeworld-${data.homeworld.replace(/\D/g, '')}`}
                    ></FetchWorld>
                  }
                </p>
              </div>
              <hr className="solid" />
              <div className="Body">
                <p>
                  Gênero 🧍{' - '}
                  {`${
                    data.gender !== 'unknown'
                      ? `${tractGender(data.gender)}`
                      : 'Desconhecido'
                  }`}
                </p>
                <p>
                  Nasceu em 👶{' - '}
                  {`${
                    data.birth_year !== 'unknown'
                      ? `${data.birth_year}`
                      : 'Desconhecido'
                  }`}
                </p>
                <p>
                  Altura 📏{' - '}
                  {`${
                    data.height !== 'unknown'
                      ? `${data.height / 100}m`
                      : 'Desconhecida'
                  }`}
                </p>
                <p>
                  Peso 🧮{' - '}
                  {`${
                    data.mass !== 'unknown' ? `${data.mass}kg` : 'Desconhecido'
                  }`}
                </p>
              </div>
            </div>
          </div>
          <div className="Person-actions">
            <Link to="/">
              <button className="lg-button">Voltar aos personagens</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function handleHairColor(hairColor: string) {
  const hairColorDictionary = {
    blond: 'Blonde',
    blonde: 'Blonde',
    brown: 'Brown',
    'brown, grey': 'BrownDark',
    auburn: 'Auburn',
    'auburn, grey': 'Auburn',
    'auburn, white': 'Auburn',
    grey: 'Platinum',
    white: 'Platinum',
  } as Record<string, string>;
  return hairColorDictionary?.[hairColor] || 'Black';
}

function handleSkinColor(skinColor: string) {
  const skinColorDictionary = {
    fair: 'Paled',
    white: 'Light',
    light: 'Light',
    pale: 'Paled',
    'brown mottle': 'Brown',
    brown: 'Brown',
    dark: 'Black',
  } as Record<string, string>;
  return skinColorDictionary?.[skinColor] || 'Tanned';
}

function tractGender(gender: string) {
  const dicionario = {
    male: 'Masculino',
    female: 'Feminino',
  } as Record<string, string>;
  return dicionario?.[gender] || 'Não especificado';
}

function FetchWorld(world: WorldProps) {
  const { data, error } = useQuery(`homeworld-${world.id}`, () =>
    fetch(`https://swapi.dev/api/planets/${world.id}`),
  );

  if (error) return 'Error';

  return data.name != 'unknown' ? data.name : 'Desconhecido';
}
