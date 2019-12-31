<template>
    <div class="item">
        <div class="thumb"></div>
        <div class="desc">
            <div class="text">
                <span class="name">{{item.itemName}}</span>
                <span class="badge">{{item.visibleTo}}</span>
            </div>
            <span class="price">{{item.itemPrice}}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
    </div>
</template>
<script>
export default {
    name: 'Item',
    props: ['item']
}
</script>
<style lang="scss" scoped>
    @import '@/styles/utils.scss';
.item{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;
    padding: 2rem 1.5rem 2rem 1.5rem;
}
.thumb{
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 15px;
    border: 1px solid #3e414b;
}
.badge{
    margin-left: 0.5rem;
}
svg{
    justify-self: flex-end;
    fill: #BEBEBE;
}
</style>