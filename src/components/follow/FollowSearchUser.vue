<template>
    <div class="user">
        <div class="thumb"></div>
        <div class="desc">
            <div class="text">
                <span class="name">{{user.userName}}</span>
            </div>
            <span class="msg">{{user.profileMsg}}</span>
        </div>
        <div class="person">
            <svg style="width:1.5rem; height:1.5rem;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V8c0-.55-.45-1-1-1s-1 .45-1 1v2H2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1H6zm9 4c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"/></svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FollowUser',
    props: ['user']
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 1rem 2rem;
    font-size: 1.2rem;
    justify-content: space-between
}
.thumb{
    width: 3rem;
    height: 3rem;
    border-radius: 10px;
    border: 0.5px solid #3e414b;
    margin-right: 1.5rem;
}
.msg{
        color: #bebebe;
    }
.name{
    color: black;
}
.desc{
    flex:1;
}
.person{
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 100%;
    background: $green;
    @include flex-center();
    svg{
        fill:white;
    }
}
</style>