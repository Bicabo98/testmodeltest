import { getAuthToken } from "./auth";
import { haxios } from "./haxios";

export const ensureAuth = () => {
    const authToken = getAuthToken();
    return authToken;
}

export const fetchUserInfo = async () => {
    if(!ensureAuth()) return undefined;
    const response = await haxios.get('/api/v1/user/info');
    return response.data.result;
}

export const fetchUserStats = async () => {
    if(!ensureAuth()) return undefined;
    const response = await haxios.get('/api/v1/user/stats');
    return response.data.result;
}

export const fetchUserProposal = async (url: string) => {
    if(!ensureAuth()) return undefined;
    const response = await haxios.get(url);
    return response.data.result;
}

export const fetchUserBindings = async () => {
    if(!ensureAuth()) return undefined;
    const response = await haxios.get('/api/v1/user/bindings');
    return response.data.result;
}

export const fetchGroupList = async () => {
    const response = await haxios.get('/api/v1/group/list?offset=0&limit=10');
    return response.data.result;
}

export const fetchProposalList = async () => {
    const response = await haxios.get('/api/v1/proposal/list?offset=0&limit=10');
    return response.data.result;
}
export const fetchProposalDetail = async (proposalId: string) => {
    const response = await haxios.get(`/api/v1/proposal/detail/${proposalId}`);
    return response.data.result;
}
export const fetchGroupProposal = async (groupId: string) => {
    const response = await haxios.get(`/api/v1/proposal/list/${groupId}`);
    return response.data.result;
}


export const fetchUserVote = async (lamportId: string) => {
    const response = await haxios.get(`/api/v1/vote/voter_votes/${lamportId}`);
    return response.data.result;
}


export const fetchProposalVote = async (proposalId: string) => {
    const response = await haxios.get(`/api/v1/vote/proposal_votes/${proposalId}`);
    return response.data.result;
}

export const fetchChoiceVote = async (choiceId: string) => {
    const response = await haxios.get(`/api/v1/vote/choice_votes/${choiceId}`);
    return response.data.result;
}


export const postCreateGroup = async (name: string) => {
    const data = {
        name,
        logo: "https://placehold.co/60x60",
        description: "description",
        website: "https://placehold.co/60x60",
        twitter: "https://placehold.co/60x60",
    };
    const response = await haxios.post('/api/v1/group/create', data);
    return response.data.result;
}


export interface CreateProposalParams {
    title: string;
    description: string;
    options: string[];
    group_id: string;
    end_time: string;
}


export const postCreateProposal = async (params: CreateProposalParams, signature: string) => {
    const response = await haxios.post('/api/v1/proposal', {data: params, sig: signature});
    return response.data.result;
}

export interface CreateVoteParams {
    channel?: string;
    choice: string;
    proposal_id: string;
}

export const postCreateVote = async (params: CreateVoteParams, signature: string) => {
    const response = await haxios.post('/api/v1/vote', {data: params, sig: signature});
    return response.data.result;
}

export const fetchTimelineList = async (lamportId: string, offset: number) => {
    const response = await haxios.get(`/api/v1/events/${lamportId}?offset=${offset}&limit=10`)
    return response.data.result;
}


export const fetchReferral = async () => {
    const response = await haxios.get(`/api/v1/referral`)
    return response.data.result;
}


export const fetchContributions = async () => {
    const response = await haxios.get(`/api/v1/contributions`)
    return response.data.result;
}

export const fetchContributionList = async (url: string) => {
    const response = await haxios.get(url)
    return response.data.result;
}


export const fetchGetUniversal = async (url: string) => {
    const response = await haxios.get(url)
    return response.data.result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const migrateToPrivy = async (data: any) => {
    const response = await haxios.post('/api/v1/user/privy/migration', data);
    return response.data.result;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginWithPrivy = async (data: any) => {
    // const response = await haxios.post('/api/v1/user/privy', data);
    const response = await haxios.post('/api/v1/users', data);

    return response.data.result;
}

export const fetchLoginWalletNonce = async (address: string) => {
    const response = await haxios.get(`/api/v1/auth/nonce/${address}`);
    return response.data.result;
}