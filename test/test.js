describe("NFTMarket", function() {
    it("Should create and execute market sales", async function() {
        const Market = await ethers.getContractFactory("NFTMarket");
        const market = await Market.deploy();
        await market.deployed();
        const marketAddress = market.address;

        const NFT = await ethers.getContractFactory("NFT");
        const nft = await NFT.deploy(marketAddress);
        await nft.deployed();
        const nftContractAddress = nft.address;

        let listingPrice = await market.getListingPrice();
        listingPrice = listingPrice.toString();

        const auctionPrice = ethers.utils.parseUnits('1', 'ether');

        await nft.createToken("https://www.mytokenlocation.com");
        await nft.createToken("https://www.mytokenlocation2.com");

        await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice });
        await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice });

        const [_, buyerAddress] = await ethers.getSigners();

        await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice});

        let items = await market.fetchMarketItems();
        items = await Promise.all(items.map(async (index) => {
            const tokenUri = await nft.tokenURI(index.tokenId);
            let item = {
                price: index.price.toString(),
                tokenId: index.tokenId.toString(),
                seller: index.seller,
                owner: index.owner,
                tokenUri
            };
            return item;
        }));
        console.log("items: ", items);
    });
});