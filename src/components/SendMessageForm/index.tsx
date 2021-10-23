import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import styles from './styles.module.scss';
import { AuthContext } from '../../context/auth';
import { api } from '../../services/api';


export const SendMessageForm = () => {

    const { user, signOut } = useContext(AuthContext);

    const [message, setMessage] = useState('');

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

    
        await api.post('messages', { message });
        setMessage('');
    }



    return (
        <div className={styles.sendMessageFormWrapper}>
            <button onClick={signOut} className={styles.signOutButton}>
                <VscSignOut size="32" />
            </button>

            <header className={styles.userInformation}>
                <div className={styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>

                <strong className={styles.userName}>{user?.name}</strong>

                <span className={styles.userGitHub}>
                    <VscGithubInverted size="16" style={{ marginRight: 3 }} />
                    {user?.login}
                </span>

            </header>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm} >
                <label htmlFor="message"> Mensagem  </label>
                <textarea
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    name="message"
                    id="message"
                    placeholder="Qual a sua expectativa para o evento?"
                />

                <button type="submit"> Enviar Mensagem </button>
            </form>

        </div>
    )
}