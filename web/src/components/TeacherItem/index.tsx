import React from 'react';

import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

import './styles.css'

export interface Teacher {
  avatar: string;
  bio: string;
  cost: string;
  phone: string;
  id: number;
  name: string;
  subject: string;
};

export interface TeacherItemProps {
  teacher: Teacher;
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post('connections', {
      user_id: teacher.id
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={`Foto de ${teacher.name}`}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/Hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a target="_blank" onClick={createNewConnection} href={`https://wa.me/${teacher.phone}`}>
          <img src={whatsAppIcon} alt="Contatar via WhatsApp" />
            Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
