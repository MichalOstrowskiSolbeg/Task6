using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Common;
using ServiceLayer.Interfaces;

namespace API.Controllers
{
    public class StatisticsController : ApiControllerBase
    {
        private readonly IStatistics _service;
        public StatisticsController(IStatistics statistics) 
        {
            _service = statistics;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetStatistics(TimeRange time)
        {
            return Ok(await _service.GetUserStatistics(GetUserId(), time));
        }
    }
}
