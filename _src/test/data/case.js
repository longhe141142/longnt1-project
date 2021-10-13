let user = {
  register:{
      userName:{
          ALPHANUM:"longnt78",
          NON_ALPHANUM:"long$98",
          WHITESPACE:"   LONG NT 4",
          EXISTED:"longnt1"
      },
      password:{
        WITH_LENGTH3:"123",
        WITH_LENGTH8:"12345678",
        WITH_LENGTH8_AND_CONTAIN_WHITESPACE:"12345 78"
      },
      email:{
          EXISTED:"director2@gmail.com", 
          INVALID_ACCEPT_DOMAIN:"longnt75@gmail.msc",
          WHITESPACE:"longnt1@  vmdev.com",
      },
      socialInsurance:{
        WITH_LENGTH3:"123",
        WITH_LENGTH5:"12345",
        WITH_CHARACTER:"123cd45",
        WITH_LENGTH13:"123456789451214"
      },
      phone:{
          VIETNAMESE_FORMAT01:"+84866841700",
          VIETNAMESE_FORMAT02:"+84 866 841 700",
          VIETNAMESE_FORMAT03:"0983264215",
          FOREIGN_FORMAT:"+1 866 451 1214",
          INVALID:"02114DS566"
      },
      age:{
          AGE_50:50,
          AGE_STRING_NUMBER:"19",
          AGE_80:80,
          AGE_12:12,
          NOT_NUMBER:"ABC"
      },
      identityNumber:{
        WITH_LENGTH3:"123",
        WITH_LENGTH9:"123456789",
        WITH_CHARACTER:"123cd45",
        WITH_LENGTH13:"123456789451214"
      },
      employee:{
          name:{
              NON_ALPHA:"dung77",
              EMPTY01:"  ",
              EMPTY02:"",
              USING_WHITESPACE:"nguyen long",
              USING_STRING:"huy"
          }
      }
  }
};

module.exports = { user };
