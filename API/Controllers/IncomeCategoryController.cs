using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.DTO.Requests;
using ServiceLayer.Interfaces;

namespace API.Controllers
{
    public class IncomeCategoryController : ApiControllerBase
    {
        private readonly IIncomeCategory _service;
        public IncomeCategoryController(IIncomeCategory incomeCategory)
        {
            _service = incomeCategory;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetIncomeCategories()
        {
            try
            {
                return Ok(await _service.GetIncomeCategories(GetUserId()));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetIncomeCategory(int id)
        {
            try
            {
                return Ok(await _service.GetIncomeCategory(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> PostIncomeCategory(string name)
        {
            try
            {
                await _service.AddIncomeCategory(name, GetUserId());
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncomeCategory(int id, string name)
        {
            try
            {
                await _service.EditIncomeCategory(name, GetUserId(), id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncomeCategory(int id)
        {
            try
            {
                await _service.DeleteIncomeCategory(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}