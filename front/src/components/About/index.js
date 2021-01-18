import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Header from '../Header';
import Footer from '../Footer';

import api from '../api';
import { toBRDate } from '../utils';

import searchImg from '../../assets/search-doramas.svg';
import itWorksImg from '../../assets/itworks.svg';

import './styles.css';

export default function About() {
  const [dbUpdate, setDbUpdate] = useState('--');
  const [apiVersion, setApiVersion] = useState('--');
  const repo = 'https://github.com/djeni98/passarama';

  useEffect(() => {
    api.get('info').then(response => {
      setDbUpdate(toBRDate(response.data.db_last_update));
      setApiVersion(response.data.api_version);
    }).catch(error => {
      setDbUpdate('(Não foi possível obter essa informação)');
      setApiVersion('(Não foi possível obter essa informação)');
    })
  }, []);

  return (
    <>
      <Header className="mb-7" />

      <Container className="mb-7">
        <Row className="mb-7">
          <Col>
            <h1 className="mb-5">
              O que é o <span className="logo-font">Passarama</span> ?
            </h1>
            <h3 className="mb-5">
              Um site para pesquisar doramas e descobrir qual fansub o disponibiliza.
            </h3>
          </Col>
          <Col className="center">
            <img src={searchImg} height={175} alt="Ilustração de pesquisa" />
          </Col>
        </Row>

        <Row xs={1} md={2} className="mb-7">
          <Col md={{span: true, order: 2}}>
            <h1 className="mb-5">
              Como funciona?
            </h1>
            <ol className="font-18 pl-inherit mb-5">
              <li className="mb-2">Um programa inspeciona os sites das fansubs procurando doramas</li>
              <li className="mb-2">O título, link e fansub são guardados em um banco de dados</li>
              <li className="mb-2">O <span className="logo-font font-22">Passarama</span> consulta esse banco de dados para pesquisar doramas</li>
            </ol>
            <p className="font-18">
              Como o processo de inspeção dos sites é demorado, ele é feito poucas vezes no mês.
            </p>
            <p className="font-18 mb-5">
              Portanto, podem haver conteúdos recém-postados que ainda não estão na banco de dados.
            </p>
          </Col>
          <Col className="center">
            <img src={itWorksImg} className="w-100" alt="Ilustração do funcionamento" />
          </Col>
        </Row>

        <Row xs={1}>
          <Col>
            <h1 className="mb-5">
              Informações
            </h1>

            <dl>
              <dt>Data de atualização do banco de dados (dd/mm/yyyy)</dt>
              <dd className="ml-4">{dbUpdate}</dd>

              <dt>Versão da API</dt>
              <dd className="ml-4">{apiVersion}</dd>

              <dt>Repositório</dt>
              <dd className="ml-4">
                O código fonte e a linha de desenvolvimento estão no repositório do github:{' '}
                <a href={repo} target="_blank" rel="noopener noreferrer">{repo}</a>
              </dd>
            </dl>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
