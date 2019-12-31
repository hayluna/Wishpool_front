<template>
    <li class="user">
        <div class="thumb"></div>
        <div class="desc">
            <div class="text">
                <span class="name">user.userName</span>
            </div>
            <span class="msg">user.profileMsg</span>
        </div>
    </li>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.user{
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding: 1.7rem 2rem;
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
</style>