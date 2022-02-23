/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from 'styled-components';
import './styles.css';
import fetch from '../../utils/fetch';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import Avatar from 'avataaars';

const Styles = styled.div`
  table {
    margin-top: 10px;
    margin-bottom: 50px;
    border-spacing: 0;
    border: 0px solid grey;
    tr {
      padding: 15px !important;
      display: inline-grid;
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      padding: 1.1rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      :last-child {
        border-right: 0;
      }
    }
    th {
      border-bottom: 0px solid grey;
      color: white;
      font-weight: bold;
    }
  }
`;

type TableProps = {
  data: any;
};

type WorldProps = {
  id: string;
  key: string;
};

const Table: React.FunctionComponent<TableProps> = ({ data }) => {
  return (
    <Styles>
      <table>
        <tbody>
          {data.results.map(
            (person: {
              name: string;
              gender: string;
              hair_color: string;
              skin_color: string;
              homeworld: string;
              url: string;
            }) => {
              const homeWorldUrlParts = person.homeworld
                .split('/')
                .filter(Boolean);
              const homeWorldId =
                homeWorldUrlParts[homeWorldUrlParts.length - 1];
              return (
                <tr key={person.name}>
                  <td>
                    <Avatar
                      style={{ width: '90px', height: '90px' }}
                      avatarStyle="Circle"
                      topType={
                        person.gender === 'male'
                          ? 'ShortHairShortWaved'
                          : person.gender === 'female'
                          ? 'LongHairMiaWallace'
                          : 'NoHair'
                      }
                      accessoriesType="Blank"
                      hairColor={handleHairColor(person.hair_color)}
                      facialHairType={
                        person.gender === 'male' ? 'BeardMedium' : 'Blank'
                      }
                      facialHairColor={handleHairColor(person.hair_color)}
                      clotheType="GraphicShirt"
                      clotheColor="Black"
                      graphicType="Deer"
                      eyeType="Squint"
                      eyebrowType="Default"
                      mouthType="Smile"
                      skinColor={handleSkinColor(person.skin_color)}
                    />
                  </td>
                  <td>
                    {person.name}
                    <br />
                    <p>
                      🪐{' '}
                      <Homeworld
                        id={homeWorldId}
                        key={`homeworld-${homeWorldId}`}
                      />
                    </p>
                  </td>
                  <td>
                    <Link
                      to={`/person/${person.url.replace(/\D/g, '')}`}
                      key={person.url.replace(/\D/g, '')}
                      state={{ id: person.url.replace(/\D/g, '') }}
                    >
                      <button className="sm-button">Ver personagem</button>
                    </Link>
                  </td>
                </tr>
              );
            },
          )}
        </tbody>
      </table>
    </Styles>
  );
};

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

function Homeworld({ id }: WorldProps) {
  const { data, isLoading } = useQuery(`homeworld-${id}`, () =>
    fetch(`https://swapi.dev/api/planets/${id}/`),
  );

  if (isLoading) return 'Carregando...';

  return data.name != 'unknown' ? data.name : 'Desconhecido';
}

export default Table;
