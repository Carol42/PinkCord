import React, { useState } from 'react';
import { Box, Image, Text } from "@skynexui/components";
import { RepoIcon, PeopleIcon } from '@primer/octicons-react';
import appConfig from "../config.json";

export default function UserCard(props) {
    const [username, setUsername] = useState('Carol42');
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const [userRepos, setUserRepos] = useState();
    const [userFollowers, setUserFollowers] = useState();
    const [userCompany, setUserCompany] = useState();
    const [userUrl, setUserUrl] = useState();
    const [userPhoto, setUserPhoto] = useState();

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${props.username}`).then(async (response) => {
            let userData = await response.json();
            const userBio = userData.bio;
            const userName = userData.name;
            const userRepos = userData.public_repos;
            const userFollowers = userData.followers;
            const userCompany = userData.company;
            const userUrl = userData.html_url;
            const userPhoto = userData.avatar_url;
            setUserBio(userBio);
            setUserName(userName);
            setUserRepos(userRepos);
            setUserFollowers(userFollowers);
            setUserCompany(userCompany);
            setUserUrl(userUrl);
            setUserPhoto(userPhoto);
        });
    });
    return (
        <Box
            styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '270px',
                padding: '16px',
                backgroundColor: props.bgColor,
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
            }}
        >
            <a target='_blank' href={props.username.length > 2 && userPhoto != null ? userUrl : null}><Image
                styleSheet={{
                    borderRadius: '50%',
                    marginBottom: '16px',
                }}
                src={props.username.length > 2 && userPhoto != null ? userPhoto : 'https://github.com/Carol42/PinkCord/blob/main/assets/brick-not-found.png?raw=true'}
            /></a>
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals['900a'],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    fontWeight: 700,
                    fontSize: '16px'
                }}
            >
                {props.username.length > 2 && userPhoto != null ? props.userName || props.username : null}
            </Text>
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals['900a'],
                    padding: '3px 10px',
                    borderRadius: '1000px'
                }}
            >
                <RepoIcon />  Repos: {props.username.length > 2 && userPhoto != null ? userRepos : '-'}  <PeopleIcon /> Followers: {props.username.length > 2 && userPhoto != null ? userFollowers : '-'}
            </Text>
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals['900a'],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    textAlign: 'center'
                }}
            >
                {props.username.length > 2 ? userCompany : null}
            </Text>
            <Text
                variant="body4"
                styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals['900a'],
                    padding: '3px 10px',
                    borderRadius: '1000px',
                    textAlign: 'center'
                }}
            >
                {props.username.length > 2 ? userBio : null}
            </Text>

        </Box>
    )
}