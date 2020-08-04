import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="https://avatars0.githubusercontent.com/u/20111371?s=460&u=11f9cd15c1dd06cc423fc8ecb831dced3c3c30c2&v=4"
                    alt="Foto de Augusto Schnorr"
                />
                <div>
                    <strong>Augusto Schnorr</strong>
                    <span>Matemática</span>
                </div>
            </header>

            <p>
                Entusiasta de tecnologia e filósofo caseiro.
                        <br /><br />
                        Apaixonado por aprender e ensinar, procura crescer a cada dia,
                         transformando o seu entorno através de ações conscientes
                         e responsáveis. Aprenda na prática e avançe para o próximo nível!
                    </p>

            <footer>
                <p>
                    Preço/Hora
                            <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIcon} alt="Contatar via WhatsApp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    );
};

export default TeacherItem;
