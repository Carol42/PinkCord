import React from "react";
import { useRouter } from "next/router";
import { Button, Box } from "@skynexui/components";
import appConfig from "../config.json";

export default function Page404() {
    const route = useRouter();
    function handleClick(event) {
        event.preventDefault();
        route.push("/");
    }
    return (
        <Box
                styleSheet={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'row',
                    backgroundImage: 'url(https://github.com/Carol42/PinkCord/blob/main/assets/page-404.png?raw=true)',
                    backgroundRepeat: 'repeat-x', backgroundSize: '100%', backgroundBlendMode: 'multiply',
                    backgroundPosition: 'center',
                }}
            >
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around  ', flexDirection: 'row', width: '80%'
                }}
            >
                <Button
                            type='submit'
                            label='Voltar ao Início'
                            styleSheet={{ marginBottom: '32px' }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.neutrals[500],
                                mainColorLight: appConfig.theme.colors.neutrals[400],
                                mainColorStrong: appConfig.theme.colors.neutrals[700],
                            }}
                            onClick={handleClick}
                        />
                        <iframe src="https://open.spotify.com/embed/track/2gTnu5RZNVFVnWdjLnyUA5?utm_source=generator&theme=0" width="30%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </Box>
            </Box>
    )
}