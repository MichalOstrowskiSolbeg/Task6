using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;

namespace API.Controllers
{
    public class IncomeController : ApiControllerBase
    {
        private readonly IIncome _service;
        public IncomeController(IIncome income) 
        {
            _service = income;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserIncomes()
        {
            return Ok(await _service.GetUserIncomes(GetUserId()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncome(int id)
        {
            try
            {
                return Ok(await _service.GetIncome(id));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostIncome(IncomeRequest request)
        {
            try
            {
                await _service.AddIncome(request, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncome(IncomeRequest request, int id)
        {
            try
            {
                await _service.UpdateIncome(request, id, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncome(int id)
        {
            try
            {
                await _service.DeleteIncome(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
