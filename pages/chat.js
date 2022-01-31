import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { XIcon, PaperAirplaneIcon, SignOutIcon } from '@primer/octicons-react';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../components/ButtonSendSticker';
import UserCard from '../components/UserCard';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwMDU4OSwiZXhwIjoxOTU4OTc2NTg5fQ.yMKyepIx2xCrQ3_8R9oP0D9vh7-s-XURy2nj24N-3CU';
const SUPABASE_URL = 'https://phzpqklonilvlzszhmvc.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagens, setListaDeMensagens] = useState([]);
    const [loading, setLoading] = useState(true)

    function escutaMensagensEmTempoReal(alteraMensagem) {
        return supabaseClient
            .from('mensagens')
            .on('*', (respostaLive) => {
                if (respostaLive.eventType === 'INSERT') {
                    console.log('insert respostaLive: ', respostaLive.new)
                    alteraMensagem('INSERT', respostaLive.new);
                } else if (respostaLive.eventType === 'DELETE') {
                    console.log('delete respostaLive: ', respostaLive.old)
                    alteraMensagem('DELETE', respostaLive.old);
                }
            })
            .subscribe();
    }

    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('Dados da consulta:', data);
                setListaDeMensagens(data);
                setLoading(false);
            });

        escutaMensagensEmTempoReal((eventType, msg) => {
            if (eventType === 'INSERT') {
                setListaDeMensagens((valorAtualDaLista) => {
                    return [msg, ...valorAtualDaLista]
                });
            } else if (eventType === 'DELETE') {
                setListaDeMensagens((valorAtualDaLista) => {
                    return (
                        valorAtualDaLista.filter((mensagemSelecionada) => {
                            return mensagemSelecionada.id != msg.id
                        }))
                });
            }

        });
    }, []);

    /* const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
        console.log('Nova mensagem:', novaMensagem);
        console.log('listaDeMensagens:', listaDeMensagens);
        // Quero reusar um valor de referencia (objeto/array) 
        // Passar uma função pro setState

        // setListaDeMensagens([
        //     novaMensagem,
        //     ...listaDeMensagens
        // ])
        setListaDeMensagens((valorAtualDaLista) => {
            console.log('valorAtualDaLista:', valorAtualDaLista);
            return [
                novaMensagem,
                ...valorAtualDaLista,
            ]
        });
    });

    return () => {
        subscription.unsubscribe();
    } */



    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
            });
        setMensagem('');
    }


    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://github.com/Carol42/PinkCord/blob/main/assets/bg.png?raw=true)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals['999a'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['700a'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    {loading ?
                        <Box
                            styleSheet={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '80%',
                                marginBottom: '4rem',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "150px"
                                }}
                                src={'https://github.com/Carol42/PinkCord/blob/main/assets/pink-floyd-anim.gif?raw=true'}
                            />
                        </Box>
                        :
                        <MessageList
                            mensagens={listaDeMensagens}
                            mensagem={mensagem}
                            setMensagens={setListaDeMensagens}
                            supabaseClient={supabaseClient}
                        />
                    }
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals['999a'],
                                marginRight: '12px',
                                color: appConfig.theme.colors.primary[400],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            label={<PaperAirplaneIcon size="small" />}
                            onClick={() => {
                                handleNovaMensagem(mensagem);
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                            styleSheet={{
                                borderRadius: '50%',
                                padding: '0 3px 0 0',
                                minWidth: '50px',
                                minHeight: '50px',
                                marginBottom: '8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box
                    styleSheet={{ display: 'flex', flexDirection: 'column' }}
                >
                    <a href={`https://github.com/${useRouter().query.username}`} target="_blank">
                        <Image
                            styleSheet={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginBottom: '5px'
                            }}
                            src={`https://github.com/${useRouter().query.username}.png`}
                        />
                    </a>
                    <Text variant='heading5' styleSheet={{ color: appConfig.theme.colors.primary[500] }}>
                        {useRouter().query.username}
                    </Text>
                </Box>
                <Image alt="pinkcord logo" width="20%" src='https://github.com/Carol42/PinkCord/blob/main/assets/header-pinkcord2.png?raw=true' />
                <iframe src="https://open.spotify.com/embed/album/4LH4d3cOWNNsVw41Gqt2kv?utm_source=generator&theme=0" width="25%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                <Button
                    variant='tertiary'
                    label={<SignOutIcon />}
                    href="/"
                    buttonColors={{
                        contrastColor: appConfig.theme.colors.neutrals["000"],
                        mainColor: appConfig.theme.colors.primary[500],
                        mainColorLight: appConfig.theme.colors.primary[400],
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);


    function handleDeleteMensagem(id) {
        const listaMensagensFiltered = props.mensagens.filter(
            messageFiltered => messageFiltered.id !== id
        );

        props.supabaseClient
            .from('mensagens')
            .delete()
            .match({ id: id })
            .then(() => {
                props.setMensagens(listaMensagensFiltered);
            })
    }

    function MouseOverPopover(props) {
        const [anchorEl, setAnchorEl] = React.useState(null);
    
        const handlePopoverOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handlePopoverClose = () => {
            setAnchorEl(null);
        };
    
        const open = Boolean(anchorEl);
    
        return (
            <div>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                >
                    {props.displayContent}
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{<UserCard username={props.mensagem.de} bgColor="black" />}</Typography>
                </Popover>
            </div>
        );
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <>
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                    display: 'flex'
                                }}
                            >
                                {<MouseOverPopover mensagem={mensagem} displayContent={
                                <a href={`https://github.com/${mensagem.de}`}>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                /></a>} 
                                />}
                                <Text tag="strong">
                                    {<MouseOverPopover mensagem={mensagem} displayContent={mensagem.de} />}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {/*  {(new Date().toLocaleDateString())}
                                    &nbsp;às&nbsp;
                                    {(new Date().toLocaleTimeString())} */}
                                    {mensagem.created_at.replace('T', ' às ')}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Text>
                                <Button
                                    variant='tertiary'
                                    label={<XIcon />}
                                    onClick={() => {
                                        handleDeleteMensagem(mensagem.id);
                                    }}
                                    styleSheet={{
                                        width: '0.5em',
                                        height: '0.5em',
                                    }}
                                    buttonColors={{
                                        contrastColor: appConfig.theme.colors.neutrals["000"],
                                        mainColor: appConfig.theme.colors.primary[500],
                                    }}
                                />
                            </Box>
                            {/* [Declarativo] */}
                            {/* Condicional: {mensagem.texto.startsWith(':sticker:').toString()} */}
                            {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image styleSheet={{ maxWidth: "100px" }} src={mensagem.texto.replace(':sticker:', '')} />
                                )
                                : (
                                    mensagem.texto
                                )}
                            {/* if mensagem de texto possui stickers:
                           mostra a imagem
                        else 
                           mensagem.texto */}
                            {/* {mensagem.texto} */}
                        </Text>
                    </>
                );
            })}
            {/*     <UserCard username={useRouter().query.username} />*/}
        </Box>
    )
}