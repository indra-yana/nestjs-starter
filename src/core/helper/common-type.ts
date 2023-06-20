export type SocialAuthProvider = 'google' | 'microsoft' | 'facebook' | 'twitter' | 'github';

export type GithubEmailType = {
    email: string,
    primary: boolean,
    verified: boolean,
    visibility: string
}