export default {
    userId: '5ded64280ee4351ae8dbc6d2',
    token: localStorage.getItem('wishToken') || '',
    sid:'',
    myProfile:{}, //내 프로필의 followingId, followerId는 id목록이 아닌 populated된 객체임.
    myAllItemList: [],
    searchUserList:[],
    currentUser:{},
    othersFollowings: [],
    othersFollowers: [],
    othersAllItemList: [],
    loading: false,
}