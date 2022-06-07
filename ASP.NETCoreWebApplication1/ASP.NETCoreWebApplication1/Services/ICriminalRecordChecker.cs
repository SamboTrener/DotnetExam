namespace examSem2.Services;

public interface ICriminalRecordChecker
{
    public bool IsJudgedCheck(string fullName, string passportData);
}