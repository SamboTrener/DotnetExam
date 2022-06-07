namespace examSem2.Services;

public class CriminalCheckerMock : ICriminalRecordChecker
{
    public bool IsJudgedCheck(string fullName, string passportData)
    {
        return fullName == "Ляпин Илья Андреевич";
    }
}