import User from "../models/userModel.js";



export const highScore = async (req, res) => {
   try {
    const { userId } = req.query;

     
     const user = await User.findOne({ _id : userId });

     if (!user) {
      return res.status(400).json({ message: 'Invalid id' });
    }
     console.log(user,'jjjjjj');
     
     res.json({ highScore: user.highScore, lastFiveScores: user.lastFiveScores });
   } catch (error) {
    console.log(error);
    
   }
  };


export const scoreUpdate = async (req, res) => {

 
  
   try {
     const { userId, moves } = req.body;
 
    console.log(userId,'ggggggggggggggggggggggggggggggggg');
    

     
     
     let user = await User.findOne({ _id : userId });
 
 
     if (!user) {
       return res.status(400).json({ message: 'Invalid id' });
     }
 
 
 
     const isNewHighScore = moves < user.highScore;
     if (isNewHighScore) {
       user.highScore = moves;
     }
   
     user.pastScores.unshift(moves);
     if (user.pastScores.length > 5) {
       user.pastScores.pop();
     }
   
     await user.save();
     res.json({ isNewHighScore,pastScores : user.pastScores });
   } catch (error) {
    console.log(error);
    
   }
  };
  