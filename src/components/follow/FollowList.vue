<template>
    <div class="view">
        <div class="header">
            <div class="empty"></div>
            <div class="title">
                친구목록
            </div>
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
        </div>
        <div class="user-me">
            <div class="thumb"></div>
            <div class="desc">
                <div class="text">
                    <span class="name">My Name</span>
                </div>
                <span class="msg">My profileMsg</span>
            </div>
        </div>
        <ul class="nav nav-tabs nav-tabs-wide">
            <li class="active"><a href="#wish" data-toggle="tab">팔로잉</a></li>
            <li><a href="#done" data-toggle="tab">팔로워</a></li>
        </ul>
        <div class="tab-content">
            <!-- follow 목록 -->
            <div class="tab-pane active" id="wish">
                <ul class="ul-item">
                    <follow-user />
                </ul>
            </div>
            <!-- follower 목록 -->
            <div class="tab-pane" id="done">
                <ul class="ul-item">
                    <follow-user />
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import FollowUser from './FollowUser.vue'
export default {
    name: 'FollowList',
    components: {
        'follow-user': FollowUser
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
     .view{
        background: white;
        height: 100%;
    }
    .header{
        display: flex;
        align-items: center;
        background: white;
        padding: 0 1rem 0 1rem;
        height: 5rem;
        box-shadow: 0px 3px 6px lightgray;
        span{
            flex:1;
            text-align: right;
        }
    }
    .empty{
        flex:1;
    }
    .title{
        flex:1;
        align-items: center;
        text-align: center;
        font-weight: bolder;
        font-size: 1.6rem;
    }
    svg{
        fill: #999ca3;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        color: #555;
        cursor: default;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #555;
    }
    .nav-tabs-wide{
        width: 100%;
        border: none;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 6rem;
        padding: 0 1.5rem 0 1.5rem;
        li{
            border: none;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #E7E7EB;
        }
        a{
            color: black;
            padding: 1rem 1rem 1.5rem 1rem;
        }
    }
    .ul-item{
        padding: 0 1rem;
    }
    .user-me{
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom: 1px solid lightgray;
        padding: 2.3rem 1.7rem;
        margin: 0 1.5rem;
    }
    .thumb{
        width: 4.5rem;
        height: 4.5rem;
        border-radius: 15px;
        border: 1px solid #3e414b;
        margin-right: 1.5rem;
    }
    .msg{
        color: #bebebe;
    }
    @media (min-width:420px){
        .header{
            height: 6rem;
            padding: 0 1.5rem 0 1.5rem;
        }
        .title{
            font-size: 2rem;
        }
        .nav-tabs-wide{
            font-size: 1.5rem;
        }
    }
</style>