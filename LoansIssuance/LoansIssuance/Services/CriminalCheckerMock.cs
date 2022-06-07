
namespace LoansIssuance.Services;

public class CriminalCheckerMock : ICriminalRecordChecker
{
    public bool IsJudgedCheck(string fullName, string passportData)
    {
        return fullName == "Ляпин Илья Андреевич";
    }
}