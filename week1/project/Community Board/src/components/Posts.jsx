import React from "react";
import Card from "./Card";

const Posts = () => {
    return (
        <table>
            <tr>
                <Card 
                    title="The Met Cloisters" 
                    description="Art Museum @ Fort George, Manhattan" 
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/The_Met_Cloisters.jpg/1024px-The_Met_Cloisters.jpg"
                    buttonUrl="https://www.metmuseum.org/plan-your-visit/met-cloisters"
                />
                <Card 
                    title="Museum of the City of New York" 
                    description="History Museum @ Upper East Side" 
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Museum_of_the_City_of_New_York_1220_Fifth_Avenue_from_west.jpg/1024px-Museum_of_the_City_of_New_York_1220_Fifth_Avenue_from_west.jpg"
                    buttonUrl="https://www.mcny.org/"
                />
                <Card 
                    title="Bohemian Hall & Beer Garden" 
                    description="Beer Garden @ Astoria, Queens" 
                    imageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0d/Bohemian_Hall_and_Beer_Garden%2C_29-19_24th_Ave.%2C_Astoria%2C_NY._Fron_sho%2C_across_the_street..JPG"
                    buttonUrl="https://www.bohemianhall.com/"
                />
            </tr>
            <tr>
                <Card 
                    title="Carl Schurz Park" 
                    description="Park @ Yorkville, Manhattan" 
                    imageUrl="https://static.nycgovparks.org/images/photo_gallery/full_size/26339.jpg"
                    buttonUrl="https://www.carlschurzparknyc.org/"
                />
                <Card 
                    title="Tenement Museum" 
                    description="History Museum @ Lower East Side, Manhattan" 
                    imageUrl="https://www.nps.gov/common/uploads/grid_builder/loea/crop16_9/AE910410-08B5-9AC5-26A9DBBA94069990.jpg?width=1300&quality=90&mode=crop"
                    buttonUrl="https://www.tenement.org/"
                />
                <Card 
                    title="Urban Hawker" 
                    description="Food Court @ Midtown Manhattan" 
                    imageUrl="https://offloadmedia.feverup.com/secretsingapore.co/wp-content/uploads/2022/09/13201124/3-3.png"
                    buttonUrl="https://www.urbanhawker.com/"
                />
            </tr>
            <tr>
                <Card 
                    title="Strand Book Store" 
                    description="Book Store @ East Village, Manhattan" 
                    imageUrl="https://thevoyageer.com/wp-content/uploads/2022/08/ACS_0574-1024x630.jpg"
                    buttonUrl="https://www.strandbooks.com/"
                />
                <Card 
                    title="Books Are Magic" 
                    description="Book Store @ Carroll Gardens, Brooklyn" 
                    imageUrl="https://images.ctfassets.net/1aemqu6a6t65/2gRMeSFmML6cQcaODUyNjd/ed8379fb11cd0172e7773f41b692978d/All-In-NYC_Books_Are_Magic?w=1200&h=800&q=75"
                    buttonUrl="https://www.booksaremagic.net/"
                />
                <Card 
                    title="Merchant's House Museum" 
                    description="Museum @ NOHO, Manhattan" 
                    imageUrl="https://media.cntraveler.com/photos/60245d0106f1780204ef667d/16:9/w_2560,c_limit/05--Denis%20Vlasov%20Merchants%20House%20Parlor.jpg"
                    buttonUrl="https://merchantshouse.org/"
                />
            </tr>
            <tr>
                <Card 
                    title="New York Transit Museum" 
                    description="Museum @ Downtown Brooklyn" 
                    imageUrl="https://nytransitmuseum.org/wp-content/uploads/2016/05/About.jpg"
                    buttonUrl="https://www.nytransitmuseum.org/"
                />
                <Card 
                    title="Van Cortlandt Park" 
                    description="Park @ The Bronx" 
                    imageUrl="https://lirp.cdn-website.com/d22fd831/dms3rep/multi/opt/img-lake-1254x749-960w.jpg"
                    buttonUrl="https://vancortlandt.org/"
                />
            </tr>
        </table>
    )
}

export default Posts;