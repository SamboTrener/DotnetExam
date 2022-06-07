using LoansIssuance.Models;
using LoansIssuance.Services;
using Microsoft.AspNetCore.Mvc;

namespace LoansIssuance.Controllers;


[Route("[controller]")]
public class CreditController : ControllerBase
{
    private readonly ICriminalRecordChecker _criminalRecordChecker;

    public CreditController(ICriminalRecordChecker criminalRecordChecker)
    {
        _criminalRecordChecker = criminalRecordChecker;
    }

    [HttpGet]
    public string Get()
    {
        return "dsfdsfwdfdwfwfwdfwfwe";
    }

    /*fullName: fullName, passportData: passportData,  age: age, amount: amount, target: target, employment: employment, isOtherCreditsExists : isOtherCreditsExists, deposit: deposit*/
    [HttpPost]
    public IActionResult Estimate([FromBody]CreditRequest request)/* string fullName, string passportData, int age, int amount,  string target, string employment, bool isOtherCreditsExists, string deposit*/
    {
        var sum = 0;

        sum += EstimatePointsForAge(request.Age, request.Amount, request.Deposit != "Без залога");

        sum += EstimatePointsForCriminalRecords(request.FullName, request.PassportData);

        sum += EstimatePointsForEmployment(request.Employment, request.Age);

        sum += EstimatePointsForTarget(request.Target);

        sum += EstimatePointsForDeposit(request.Deposit);

        sum += EstimatePointsForAnotherCreditsExistence(request.IsOtherCreditsExists, request.Target == "Перекредитование");

        sum += EstimatePointsForAmount(request.Amount);

        var percent = 0.0;
        switch (sum)
        {
            case <= 80:
                return Ok("Кредит не одобрен");
            case > 80 and < 84:
                percent = 30;
                break;
            case >= 84 and < 88:
                percent = 26;
                break;
            case >= 88 and < 92:
                percent = 22;
                break;
            case >= 92 and < 96:
                percent = 19;
                break;
            case >= 96 and < 100:
                percent = 15;
                break;
            case 100:
                percent = 12.5;
                break;
        }

        return Ok($"Вам одобрен кредит под {percent} % годовых");
    }

    [NonAction]
    private int EstimatePointsForAnotherCreditsExistence(bool isAnotherCreditsExists, bool isTargetReCrediting)
    {
        if (isAnotherCreditsExists || isTargetReCrediting)
            return 0;
        return 15;
    }

    [NonAction]
    private int EstimatePointsForEmployment(string employment, int age)
    {
        return employment switch
        {
            "Трудоустройство по трудовому договору" => 14,
            "Владелец ИП" => 12,
            "Фрилансер" => 8,
            "Пенсионер" => age < 70 ? 5 : 0,
            _ => 0
        };
    }

    [NonAction]
    private int EstimatePointsForCriminalRecords(string fullName, string passportData)
    {
        return _criminalRecordChecker.IsJudgedCheck(fullName, passportData) ? 0 : 15;
    }

    [NonAction]
    private int EstimatePointsForTarget(string target)
    {
        return target switch
        {
            "Потребительский" => 14,
            "Недвижимость" => 8,
            "Перекредитование" => 12,
            _ => 0
        };
    }

    [NonAction]
    private int EstimatePointsForAge(int age, int amount, bool isDepositExists)
    {
        switch (age)
        {
            case >= 21 and <= 28:
                return amount switch
                {
                    < 1000000 => 12,
                    < 3000000 => 9,
                    _ => 0
                };
            case >= 29 and <= 59:
                return 14;
            case >= 60 and <= 72:
                return isDepositExists ? 8 : 0;
        }

        return 0;
    }

    [NonAction]
    private int EstimatePointsForAmount(int amount)
    {
        return amount switch
        {
            < 1000000 => 12,
            < 5000000 => 14,
            _ => 8
        };
        //> 1000000?
    }

    [NonAction]
    private int EstimatePointsForDeposit(string deposit)
    {
        return deposit switch
        {
            "Недвижимость" => 14,
            "Поручительство" => 12,
            "Автомобиль старше 3 лет" => 3,
            "Автомобиль младше 3 лет" => 8,
            _ => 0
        };
    }
}